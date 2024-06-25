import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountFromMilliunits(amount: number) {
  return Math.round(amount / 1000);
}

export function convertAmountToMilliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(amout: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
    minimumFractionDigits: 2,
  }).format(amout);
}

export function calculatePercentageChange(previous: number, current: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}
