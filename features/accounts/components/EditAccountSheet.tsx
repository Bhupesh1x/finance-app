import { z } from "zod";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

import { useConfirm } from "@/hooks/useConfirm";
import { insertAccountSchema } from "@/db/schema";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { AccountForm } from "./AccountForm";
import { useGetAccount } from "../api/useGetAccount";
import { useEditAccount } from "../api/useEditAccount";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useDeleteAccount } from "../api/useDeleteAccount";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const { data, isLoading } = useGetAccount(id);

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this account.",
  });

  const mutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const disabled = mutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = useMemo(() => {
    const name = data ? { name: data.name } : { name: "" };
    return name;
  }, [data]);

  return (
    <>
      <ConfirmDialog />
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
              disabled={disabled}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
