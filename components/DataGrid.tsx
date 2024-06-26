"use client";

import { FaPiggyBank } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/api/useGetSummary";

import { formatDateRange } from "@/lib/utils";

import { DataCard, DataCardLoading } from "@/components/DataCard";

export const DataGrid = () => {
  const { data, isLoading } = useGetSummary();

  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;

  const dataRangeLabel = formatDateRange({ from, to });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />

        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        variant="default"
        title="Remaining"
        icon={FaPiggyBank}
        dateRange={dataRangeLabel}
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
      />
      <DataCard
        variant="default"
        title="Income"
        icon={FaArrowTrendUp}
        dateRange={dataRangeLabel}
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
      />
      <DataCard
        variant="default"
        title="Expenses"
        icon={FaArrowTrendDown}
        dateRange={dataRangeLabel}
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
      />
    </div>
  );
};
