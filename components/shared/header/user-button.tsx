"use client";

import Link from "next/link";
import Image from "next/image";
import { UserIcon, LogOut, Package, User } from "lucide-react";
import { SignoutUser } from "@/lib/actions/user.actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";

const UserButton = ({ session }: { session: Session | null }) => {
  // if is not logged in, display sign in button
  if (!session) {
    return (
      <Button asChild variant="ghost" size="icon" className="relative">
        <Link href="/sign-in" aria-label="Sign in">
          <UserIcon className="size-5" />
        </Link>
      </Button>
    );
  }

  const { user } = session;

  const firstInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  //display dropdown menu list
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative shrink-0 overflow-hidden rounded-full"
          >
            {/**display user image if not exist then display firstInitial of user's name */}
            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name ?? user?.email ?? "User"}
                fill
                sizes="40px"
                className="object-cover pointer-events-none"
              />
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full border border-border text-xl font-semibold text-foreground">
                {firstInitial}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        {/**user account info */}
        <DropdownMenuContent className="w-56 font-sans" align="end">
          <DropdownMenuLabel className="font-normal p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {user?.name ?? user?.email ?? "Account"}
              </p>
              {user?.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/**user profile link */}
          <DropdownMenuItem asChild>
            <Link
              href="/user/profile"
              className="px-2 py-2 cursor-pointer flex items-center"
            >
              <User className="mr-2 h-4 w-4" /> User Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/user/orders"
              className="px-2 py-2 cursor-pointer flex items-center"
            >
              <Package className="mr-2 h-4 w-4" /> Order History
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/**Sign out button */}
          <DropdownMenuItem className="p-0 focus:bg-accent">
            <form action={SignoutUser} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="h-auto w-full justify-start gap-2 rounded-sm px-2 py-2 text-sm font-normal text-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
