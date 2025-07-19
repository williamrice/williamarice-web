"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createFuelTransaction } from "../actions";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

const formSchema = z.object({
  amount: z.number().nonnegative({
    message: "Amount must be a positive number.",
  }),
  date: z.date({
    error: "A date is required.",
  }),
});

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSuccessFormSubmit: Dispatch<SetStateAction<boolean>>;
};

export function FuelTransactionAddForm({
  setShowModal,
  setSuccessFormSubmit,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //
    setIsCreating(true);
    setSuccessFormSubmit(false);
    const result = await createFuelTransaction(values);
    startTransition(router.refresh);
    if (result.success) {
      setIsCreating(false);
      setSuccessFormSubmit(true);
      setShowModal(false);
    }
    return result;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Date you got fuel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormDescription>
                This is the amount of fuel you pumped.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center gap-2 w-full">
          <Button className="bg-green-200 hover:bg-green-500" type="submit">
            {isCreating ? <BarLoader width={48} /> : "Submit"}
          </Button>
          <Button
            className="bg-red-200 hover:bg-red-500"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
