import Link from "next/link";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ShowAvailable = ({
  variant,
}: {
  variant:
    | "default"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) => {
  return (
    <Button asChild className="ml-2 space-x-2" variant={variant}>
      <Link href="/app/books/available">
        <Book></Book>
        <span className="hidden md:inline whitespace-nowrap">
          Show Available Books
        </span>
      </Link>
    </Button>
  );
};
