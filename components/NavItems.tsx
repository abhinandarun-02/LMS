import { IndianRupee, LayoutDashboard, Library, Users } from "lucide-react";
import { NavItem } from "./Sidebar";

export const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "/app",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    label: "Overdue",
    href: "/app/overdue",
    icon: IndianRupee,
    disabled: false,
  },
  {
    label: "Books",
    href: "/app/books",
    icon: Library,
    disabled: false,
  },
  {
    label: "Users",
    href: "/app/users",
    icon: Users,
    disabled: false,
  },
];
