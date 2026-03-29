"use client";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-4">
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="size-5"></ShoppingCart>
            <span className="absolute min-w-4 h-4 px-1 rounded-full -top-1 -right-1 bg-primary text-primary-foreground text-[10px] leading-4 text-center">
              0
            </span>
          </Link>
        </Button>

        <Button asChild variant="ghost" size="icon">
          <Link href="/sign-in" aria-label="User account">
            <UserIcon className="size-5"></UserIcon>
          </Link>
        </Button>
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button asChild variant="ghost" size="icon" aria-label="Open menu">
              <EllipsisVertical className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-4 items-start pl-8">
            <SheetHeader className="px-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu</SheetDescription>
            </SheetHeader>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="size-5"></ShoppingCart>
                <span className="absolute min-w-4 h-4 px-1 rounded-full -top-1 -right-1 bg-primary text-primary-foreground text-[10px] leading-4 text-center">
                  0
                </span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon">
              <Link href="/sign-in" aria-label="User account">
                <UserIcon className="size-5"></UserIcon>
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
