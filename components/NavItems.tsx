import { IndianRupee, LayoutDashboard, User, Users } from "lucide-react";
import { NavItem } from "./Sidebar";

export const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    disabled: false,
  },
  {
    label: "Overdue",
    href: "/overdue",
    icon: IndianRupee,
    disabled: false,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: User,
    disabled: false,
  },
];
