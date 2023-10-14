import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddIssue = ({
  variant,
}: {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) => {
  return (
    <Button asChild className="ml-2 space-x-2" variant={variant}>
      <Link href="/app/issues/add">
        <Plus></Plus>
        <span className="hidden md:inline whitespace-nowrap">Issue a Book</span>
      </Link>
    </Button>
  );
};
