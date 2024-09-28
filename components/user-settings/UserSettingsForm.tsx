"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import useSWR from "swr";

const formSchema = z.object({
  theme: z.string({
    required_error: "Please select a preferred theme.",
  }),
});

async function onSubmit(
  values: z.infer<typeof formSchema>,
  setThemeFunction: Function
) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.

  // using fetch, update the user's theme preference to the POST endpoint /api/user/settings
  const response = await fetch("/api/user/settings", {
    method: "POST",
    body: JSON.stringify(values),
  });
  setThemeFunction(values.theme);
}

export function UserSettingsForm() {
  useEffect(() => {
    console.log("UserSettingsForm mounted");
    return () => {
      console.log("UserSettingsForm unmounted");
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "system",
    },
  });
  const { theme, setTheme } = useTheme();
  const user = useUser();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, setTheme))}
        className="space-y-8 max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a preferred theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your preferred theme.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
