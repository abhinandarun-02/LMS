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
        "bg-white dark:bg-zinc-950": true, // colors
        "fixed flex items-center justify-start": true, // layout
        "w-full fixed px-4 shadow-inner h-16 z-10 gap-2": true, //positioning & styling
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
      <div className="flex z-10 items-center justify-between">
        <Button asChild>
          <Link href="/">
            <LogOut>Log Out</LogOut>
          </Link>
        </Button>
      </div>
      <Button className="md:hidden z-10" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </Button>
    </nav>
  );
}
