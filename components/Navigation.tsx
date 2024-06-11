"use client";

import { usePathname } from "next/navigation";

import { NavButton } from "./NavButton";

const routes = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Transactions",
    href: "/transactions",
  },
  {
    label: "Accounts",
    href: "/accounts",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map(({ label, href }) => (
        <NavButton
          key={href}
          href={href}
          label={label}
          isActive={href === pathname}
        />
      ))}
    </nav>
  );
};
