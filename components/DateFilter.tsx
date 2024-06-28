"use client";

import qs from "query-string";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatDateRange } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams();

  const to = param.get("to") || undefined;
  const from = param.get("from") || undefined;
  const accountId = param.get("accountId") || undefined;

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (range: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(range?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(range?.to || defaultTo, "yyyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          disabled={false}
          className="bg-white/10 text-white outline-none border-none hover:bg-white/20 active:bg-white/30 focus:ring-offset-0 focus:ring-transparent transition w-full lg:w-auto h-9 rounded-md px-3 font-normal hover:text-white"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="size-4 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full"
              disabled={!date?.from || !date?.to}
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              className="w-full"
              disabled={!date?.from || !date?.to}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
