"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Bet, Status } from "@prisma/client";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { BetParams, createBet } from "./BetActions";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  amountBet: z.coerce.number().min(0),
  amountWon: z.coerce.number().min(0),
  date: z.date(),
  status: z.nativeEnum(Status),
  description: z.string().min(1, { message: "Description is required" }),
});

interface CreateBetFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateBetForm({ setOpen }: CreateBetFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountBet: 0,
      amountWon: 0,
      date: new Date(),
      status: Status.PENDING,
      description: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const betData: BetParams = {
      amountBet: values.amountBet,
      amountWon: values.amountWon,
      date: values.date,
      status: values.status,
      description: values.description,
    };
    const result = await createBet(betData);
    setLoading(false);
    if (result) {
      setOpen(false);
      toast({
        title: "Bet created",
        description: "We've created your bet for you.",
        duration: 2000,
      });
    } else {
      form.setError("amountBet", {
        message: "Something went wrong while creating a bet",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="amountBet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bet Amount</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountWon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Won</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bet status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Status.PENDING}>Pending</SelectItem>
                  <SelectItem value={Status.WIN}>Won</SelectItem>
                  <SelectItem value={Status.LOSS}>Lost</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Bet</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Info</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{loading ? "Loading..." : "Create Bet"}</Button>
      </form>
    </Form>
  );
}
