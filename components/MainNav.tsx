'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { NavItem } from './Sidebar'
import {
  BookLock,
  IndianRupee,
  LayoutDashboard,
  Library,
  Users,
} from "lucide-react";
import { Button } from '@/components/ui/button'
import React from 'react'

export default function MainNav() {
  const pathname = usePathname()

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const routes: NavItem[] = [
    {
      label: "Dashboard",
      href: "/app",
      active: pathname === '/app',
      icon: LayoutDashboard,
      disabled: false,
    },
    {
      label: "Overdue",
      href: "/app/overdue",
      active: pathname === '/app/overdue',
      icon: IndianRupee,
      disabled: false,
    },
    {
      label: "Issues",
      href: "/app/issues",
      active: pathname === '/app/issues',
      icon: BookLock,
      disabled: false,
    },
    {
      label: "Books",
      href: "/app/books",
      active: pathname === '/app/books',
      icon: Library,
      disabled: false,
    },
    {
      label: "Users",
      href: "/app/users",
      active: pathname === '/app/users',
      icon: Users,
      disabled: false,
    },
  ];

  return (
    <>
      {routes.map((route) => (
          <Button
            key={route.href}
            variant={"ghost"}
            disabled={route.disabled}
            className={cn(
              'w-full justify-start text-black dark:text-white h-full',
              route.active
                ? 'bg-zinc-200'
                : ''
            )}
          >
            <Link
              href={route.href}
              className="h-10 w-full mx-4 flex justify-start items-center cursor-pointer rounded-lg text-md font-large"
            >
              <div className="flex">
                <route.icon className="h-5 w-5 mr-3 text-black dark:text-white" />
                {route.label}
              </div>
            </Link>
          </Button>
        ))}
    </>
  )
}
