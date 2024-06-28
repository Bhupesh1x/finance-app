"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/NavButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

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
];

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setisOpen] = useState(false);

  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setisOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setisOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 text-white border-none hover:bg-white/20 hover:text-white active:bg-white/30 focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <div className="flex flex-col gap-2 pt-6">
            {routes.map(({ href, label }) => (
              <Button
                key={href}
                variant={pathname === href ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onClick(href)}
              >
                {label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

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
