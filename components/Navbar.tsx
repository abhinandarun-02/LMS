"use client";

import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";

type Props = {
  onMenuButtonClick(): void;
};

export default function Navbar(props: Props) {
  return (
    <nav
      className={classNames({
        "bg-white dark:bg-popover": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-inner h-16 gap-2": true, //positioning & styling
      })}
    >
      <Image
        src={Logo}
        fill={true}
        className="invert dark:grayscale"
        alt="NavbarLogo"
      />
      <div className="flex-grow"></div>
      <ModeToggle></ModeToggle>
      <div className="flex text-grey cursor-pointer gap-2">
        <Button asChild>
          <Link href="/">
            <LogOut></LogOut>
          </Link>
        </Button>
      </div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
}
