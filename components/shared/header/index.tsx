import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start gap-4">
            <Image
              src={"/android-chrome-512x512.png"}
              className="flex-center "
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
            />
            <span className="hidden lg:block gap-2 font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex-start gap-2">
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
        </div>
      </div>
    </header>
  );
};
export default Header;
