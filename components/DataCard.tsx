import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";

import {
  cn,
  convertAmountFromMilliunits,
  formatCurrency,
  formatPercentage,
} from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CountUp } from "@/components/CountUp";
import { Skeleton } from "./ui/skeleton";

const boxVariant = cva("shrink-0 rounded-md p-2", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  title: string;
  value?: number;
  icon: IconType;
  dateRange: string;
  percentageChange?: number;
}

export const DataCard = ({
  title,
  variant,
  dateRange,
  value = 0,
  icon: Icon,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-x-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-1">
              {dateRange}
            </CardDescription>
          </div>

          <div className={cn(boxVariant({ variant }))}>
            <Icon className={cn(iconVariant({ variant }))} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl line-clamp-1 font-bold mb-2 break-all">
          <CountUp
            preserveValue
            start={0}
            end={convertAmountFromMilliunits(value)}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={`text-muted-foreground text-sm line-clamp-1 ${
            percentageChange > 0 ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {formatPercentage(percentageChange)} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-x-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="rounded-md shrink-0 size-12" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-24 mb-2 shrink-0" />
        <Skeleton className="h-4 w-40 shrink-0" />
      </CardContent>
    </Card>
  );
};
