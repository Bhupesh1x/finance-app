"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

export const AddNewButton = () => {
  const { onOpen } = useNewAccount();

  return (
    <Button size="sm" onClick={onOpen}>
      <Plus className="size-4 mr-2" />
      Add New
    </Button>
  );
};
