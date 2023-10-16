import Link from "next/link";
import { BookUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReturnIssue = ({
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
      <Link href="/app/issues/return">
        <BookUpIcon></BookUpIcon>
        <span className="hidden md:inline whitespace-nowrap">Return Issue</span>
      </Link>
    </Button>
  );
};
