import { z } from "zod";
import { useCallback, useMemo } from "react";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccounts } from "@/features/accounts/api/useCreateAccount";

import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";

import { insertTransactionSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/useNewAccount";
import { useCreateTransaction } from "../api/useCreateTransaction";
import { TransactionForm } from "./TransactionForm";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const mutation = useCreateTransaction();

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = useCallback(
    (name: string) => {
      categoryMutation.mutate({ name });
    },
    [categoryMutation]
  );
  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  );

  const { data: accounts, isLoading: accountsLoading } = useGetAccounts();
  const accountMutation = useCreateAccounts();
  const onCreateAccount = useCallback(
    (name: string) => {
      accountMutation.mutate({ name });
    },
    [accountMutation]
  );
  const accountOptions = useMemo(
    () =>
      accounts?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [accounts]
  );

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isPending =
    mutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = accountsLoading || categoriesLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-2">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions || []}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions || []}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
