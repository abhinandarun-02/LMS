import Link from "next/link";
import { BookMarked, BookUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReturnOverdue = ({
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
      <Link href="/app/overdue/return">
        <BookUp></BookUp>
        <span className="hidden md:inline whitespace-nowrap">
          Return Overdue
        </span>
      </Link>
    </Button>
  );
};
