"use client";

import { columns } from "./columns";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions";

export const TransactionsTable = () => {
  const { data: transactions = [], isLoading } = useGetTransactions();
  const deleteMutation = useBulkDeleteTransactions();

  const disabled = deleteMutation.isPending || isLoading;

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-[40px] max-w-sm mt-5" />
        <Skeleton className="h-[150px] w-full mt-6" />
      </>
    );
  }

  return (
    <>
      <DataTable
        filterKey="name"
        columns={columns}
        data={transactions}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteMutation.mutate({ ids });
        }}
        disabled={disabled}
      />
    </>
  );
};
