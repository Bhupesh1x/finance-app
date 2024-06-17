"use client";

import { columns } from "./columns";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";

export const AccountsTable = () => {
  const { data: accounts = [], isLoading } = useGetAccounts();

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
      <DataTable filterKey="email" columns={columns} data={accounts} />
    </>
  );
};
