"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNewCategory } from "@/features/categories/hooks/useNewCategory";

export const AddNewButton = () => {
  const { onOpen } = useNewCategory();

  return (
    <Button size="sm" onClick={onOpen}>
      <Plus className="size-4 mr-2" />
      Add New
    </Button>
  );
};
