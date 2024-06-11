import Link from "next/link";

import { Button } from "./ui/button";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={`text-white border-none w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition ${
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      }`}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
