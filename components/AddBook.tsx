import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddBook = ({
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
      <Link href="/app/books/new">
        <Plus></Plus>
        <span className="hidden md:inline whitespace-nowrap">Add Book</span>
      </Link>
    </Button>
  );
};
