"use client";

import { useEffect, useState } from "react";

import { NewAccountSheet } from "@/features/accounts/components/NewAccountSheet";

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
    </>
  );
};
