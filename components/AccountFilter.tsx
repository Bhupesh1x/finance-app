"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetSummary } from "@/features/summary/api/useGetSummary";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AccountFilter = () => {
  const { isLoading: isLoadingSummary } = useGetSummary();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();

  const to = param.get("to") || undefined;
  const from = param.get("from") || undefined;
  const accountId = param.get("accountId") || "all";

  const onChange = (value: string) => {
    const query = {
      accountId: value,
      from,
      to,
    };

    if (value === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="bg-white/10 text-white outline-none border-none hover:bg-white/20 active:bg-white/30 focus:ring-offset-0 focus:ring-transparent transition w-full lg:w-auto h-9 rounded-md px-3 font-normal">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
