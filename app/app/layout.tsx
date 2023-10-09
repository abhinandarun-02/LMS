"use client";

import React, { PropsWithChildren, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import classNames from "classnames";

export default function Layout(props: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100 dark:bg-black overflow-clip">
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid py-2.5 md:grid-cols-sidebar overflow-clip">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div
          className={classNames({
            "p-4": true, // layout
            "bg-white rounded-lg shadow-inner dark:bg-black dark:text-white":
              true, // colors
            "mx-2.5 overflow-y-auto": true, // positioning
          })}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
