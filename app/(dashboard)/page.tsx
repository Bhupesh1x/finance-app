"use client";

import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

export default function Home() {
  const { onOpen } = useNewAccount();

  return (
    <main>
      <h1 onClick={onOpen} className="cursor-pointer">
        Dashboard Page
      </h1>
    </main>
  );
}
