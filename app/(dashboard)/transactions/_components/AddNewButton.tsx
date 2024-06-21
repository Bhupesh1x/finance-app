"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction";

export const AddNewButton = () => {
  const { onOpen } = useNewTransaction();

  return (
    <Button size="sm" onClick={onOpen} className="w-full lg:w-auto">
      <Plus className="size-4 mr-2" />
      Add New
    </Button>
  );
};
