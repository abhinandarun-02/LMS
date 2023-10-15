"use client"
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";


export const UserAvatar = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="w-full flex items-center p-4">
        <UserButton afterSignOutUrl="/sign-in" showName appearance={
          {  
            baseTheme:  resolvedTheme==='dark'? dark :  undefined,
            elements: 
            {
              userButtonAvatarBox: "w-[48px] h-[48px]", 
              userButtonBox: "flex-row-reverse"
            }
          }}
        />
      </div>
  );
};
