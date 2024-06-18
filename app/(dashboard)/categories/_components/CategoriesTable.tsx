"use client";

import { columns } from "./columns";

import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useBulkDeleteCategories } from "@/features/categories/api/useBulkDeleteCategories";

export const CategoriesTable = () => {
  const { data: categories = [], isLoading } = useGetCategories();
  const deleteMutation = useBulkDeleteCategories();

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
        data={categories}
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id);
          deleteMutation.mutate({ ids });
        }}
        disabled={disabled}
      />
    </>
  );
};
