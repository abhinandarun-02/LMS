import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import { items } from "./NavItems";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";

type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};

export interface NavItem {
  label: string;
  icon: any;
  href: string;
  disabled: boolean;
}

const Sidebar = ({ open, navItems = items, setOpen }: Props) => {
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
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={"ghost"}
            disabled={item.disabled}
            className="w-full justify-start text-black dark:text-white h-full"
          >
            <Link
              href={item.href}
              className="h-10 w-full mx-4 flex justify-start items-center cursor-pointer rounded-lg text-md font-large"
            >
              <div className="flex">
                <item.icon className="h-5 w-5 mr-3 text-black dark:text-white" />
                {item.label}
              </div>
            </Link>
          </Button>
        ))}
      </div>
      {/* account  */}
      <div className="flex gap-2 items-center cursor-pointer p-4">
        <UserAvatar
          name="DP"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuC0J5U2oOIippV-AiExQnz7BKcFOyd6Fdzg&usqp=CAU"
        />
        <h3 className="font-medium text-black dark:text-white">
          Monkey D Luffy
        </h3>
      </div>
    </div>
  );
};
export default Sidebar;
