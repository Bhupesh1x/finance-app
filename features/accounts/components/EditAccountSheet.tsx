import { z } from "zod";
import { useMemo } from "react";

import { insertAccountSchema } from "@/db/schema";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { AccountForm } from "./AccountForm";
import { useGetAccount } from "../api/useGetAccount";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useCreateAccounts } from "../api/useCreateAccount";
import { Loader2 } from "lucide-react";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const { data, isLoading } = useGetAccount(id);

  const mutation = useCreateAccounts();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = useMemo(() => {
    const name = data ? { name: data.name } : { name: "" };
    return name;
  }, [data]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-2">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
