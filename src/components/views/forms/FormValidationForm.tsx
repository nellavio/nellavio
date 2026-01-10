"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Card } from "../../common/Card";
import { Input } from "../../shadcn/input";
import { Button } from "../../shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shadcn/form";

// Form Schema for Validation Example using Yup
const formSchema = yup.object({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters.")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
});

export const FormValidationForm = () => {
  // Form definition
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: yup.InferType<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card isHeaderDividerVisible addTitleMargin title="Form Validation">
      <div className="text-sm text-secondaryText mb-6">
        Using react-hook-form and yup for validation.
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};
