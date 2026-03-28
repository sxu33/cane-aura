import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t">
      <div className="wrapper py-6 text-sm text-muted-foreground flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center sm:text-left">
          © {currentYear} {APP_NAME}. All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 sm:justify-end">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
