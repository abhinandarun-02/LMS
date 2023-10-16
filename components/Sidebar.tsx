import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import MainNav from "./MainNav";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";

type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

export interface NavItem {
  label: string;
  icon: any;
  href: string;
  active: boolean
  disabled: boolean;
}

const Sidebar = ({ open, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
      className={classNames({
        "fixed flex flex-col justify-between overflow-clip": true, // layout
        "bg-white rounded-lg text-zinc-50 shadow-inner dark:bg-zinc-950 dark:text-white":
          true, // colors
        "md:w-full md:sticky md:top-8 md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_64px)] h-full w-[300px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      {/* NavItems */}
      <div className="links mt-16 mx-4 flex flex-col gap-2 items-center">
        <MainNav/>
      </div>
      {/* account  */}
      <UserAvatar />
    </div>
  );
};
export default Sidebar;
