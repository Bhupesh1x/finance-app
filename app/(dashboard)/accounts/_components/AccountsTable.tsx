"use client";

import { columns } from "./columns";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/useBulkDelete";

export const AccountsTable = () => {
  const { data: accounts = [], isLoading } = useGetAccounts();
  const deleteMutation = useBulkDeleteAccounts();

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
        filterKey="email"
        columns={columns}
        data={accounts}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteMutation.mutate({ ids });
        }}
        disabled={disabled}
      />
    </>
  );
};
