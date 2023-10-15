import React from "react";
import Image from "next/image";

import Bg from "@/public/bg.jpg";
import { ModeToggle } from "@/components/ModeToggle";
import Logo from "@/public/logo.svg";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="flex h-screen overflow-clip dark:bg-zinc-950 max-md:flex-col">
      <div className="w-1/2 bg-cover max-md:hidden">
        <Image src={Bg} className="h-full" alt={"Background"} />
      </div>
      <div className="flex-grow-0 flex-row p-2">
        <ModeToggle></ModeToggle>
      </div>
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-2 max-md:h-full max-md:">
      <Image
            src={Logo}
            className="invert dark:grayscale"
            width={200}
            height={128}
            alt="logo"
          />
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;