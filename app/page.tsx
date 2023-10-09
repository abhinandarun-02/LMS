"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Logo from "@/public/logo.svg";
import Bg from "@/public/bg.jpg";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  // const router = useRouter();
  // const [credentials, setCredentials] = useState({
  //   username: "",
  //   password: "",
  // });

  return (
    <div className="flex h-screen overflow-clip dark:bg-zinc-950 max-md:flex-col">
      <div className="w-1/2 bg-cover max-md:hidden">
        <Image src={Bg} className="h-full" alt={"Background"} />
      </div>
      <div className="flex-grow-0 flex-row p-2">
        <ModeToggle></ModeToggle>
      </div>
      <div className="lg:w-1/2 flex items-center justify-center p-2 max-md:h-full max-md:">
        <form>
          <Image
            src={Logo}
            className="invert dark:grayscale"
            width={400}
            height={256}
            alt="logo"
          />
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              // value={credentials.username}
              // onChange={(e) =>
              //   setCredentials({ ...credentials, username: e.target.value })
              // }
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              // value={credentials.password}
              // onChange={(e) =>
              //   setCredentials({ ...credentials, password: e.target.value })
              // }
            />
          </div>
          <div className="flex items-center justify-between">
            <Button asChild>
              <Link href="/app">Login</Link>
            </Button>
            <Button variant={"outline"}>Reset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
