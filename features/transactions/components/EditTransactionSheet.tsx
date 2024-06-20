import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useConfirm } from "@/hooks/useConfirm";
import { insertTransactionSchema } from "@/db/schema";
import { convertAmountFromMilliunits } from "@/lib/utils";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccounts } from "@/features/accounts/api/useCreateAccount";

import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { TransactionForm } from "./TransactionForm";
import { useGetTransaction } from "../api/useGetTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import { useDeleteTransaction } from "../api/useDeleteTransaction";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const { data, isLoading: transactionLoading } = useGetTransaction(id);

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this transaction.",
  });

  const mutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

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
      accounts?.map((account) => ({
        label: account.name,
        value: account.id,
      })),
    [accounts]
  );

  const disabled =
    mutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = transactionLoading || accountsLoading || categoriesLoading;

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
    const values = data
      ? {
          accountId: data.accountId,
          categoryId: data.categoryId,
          amount: convertAmountFromMilliunits(data.amount).toString(),
          date: data.date ? new Date(data.date) : new Date(),
          payee: data.payee,
          notes: data.notes,
        }
      : {
          accountId: "",
          categoryId: "",
          amount: "",
          date: new Date(),
          payee: "",
          notes: "",
        };
    return values;
  }, [data]);

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-2">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={disabled}
              defaultValues={defaultValues}
              categoryOptions={categoryOptions || []}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions || []}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
