import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddUser = ({
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
      <Link href="/app/users/add">
        <User></User>
        <span className="hidden md:inline whitespace-nowrap">Add User</span>
      </Link>
    </Button>
  );
};
