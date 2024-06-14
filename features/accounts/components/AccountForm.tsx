"use client";

import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { insertAccountSchema } from "@/db/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  disabled?: boolean;
  onDelete?: () => void;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
};

export const AccountForm = ({
  id,
  disabled,
  onDelete,
  defaultValues,
  onSubmit,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="pt-4 flex flex-col gap-4">
          <Button className="w-full" disabled={disabled}>
            {id ? "Save changes" : "Create Account"}
          </Button>
          {!!id && (
            <Button
              type="button"
              className="w-full"
              variant="outline"
              disabled={disabled}
              onClick={handleDelete}
            >
              <Trash className="size-4" />
              <p className="ml-2">Delete account</p>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
