"use client";

import { useEffect, useState } from "react";

import { NewAccountSheet } from "@/features/accounts/components/NewAccountSheet";
import { EditAccountSheet } from "@/features/accounts/components/EditAccountSheet";

import { NewCategorySheet } from "@/features/categories/components/NewCategorySheet";
import { EditCategorySheet } from "@/features/categories/components/EditCategorySheet";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};
