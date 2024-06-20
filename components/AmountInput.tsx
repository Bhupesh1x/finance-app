import { Info, MinusCircle, PlusCircle } from "lucide-react";
import CurrencyInput from "react-currency-input-field";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string | undefined) => void;
};

export const AmountInput = ({
  value,
  disabled,
  onChange,
  placeholder,
}: Props) => {
  const parsedValue = parseFloat(value);

  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;
    onChange(newValue?.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={`bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-1.5 flex items-center justify-center transition ${
                isIncome && "!bg-rose-500 hover:!bg-rose-600"
              } ${isExpense && "!bg-emerald-500 hover:!bg-emerald-600"}`}
            >
              {!parsedValue && <Info className="size-4 text-white" />}
              {isIncome && <MinusCircle className="size-4 text-white" />}
              {isExpense && <PlusCircle className="size-4 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent className="text-right">
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        placeholder={placeholder}
        onValueChange={onChange}
        disabled={disabled}
      />

      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as an expense"}
      </p>
    </div>
  );
};
