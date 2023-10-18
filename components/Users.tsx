"use client"

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UsersProps {
  image : string | null
  name : string
  className ?: string
}

export const Users : React.FC<UsersProps> = ({
  image,
  name,
  className
}) => {

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Avatar
      className={cn(
        "cursor-pointer bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle",
        className
      )}
    >
      {image &&       
        <AvatarImage
          className="h-full w-full rounded-[inherit] object-cover"
          src={image}
          alt={name}
        />}

      <AvatarFallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white dark:bg-popover text-[15px] font-medium border border-solid border-gray-400 dark:text-white"
        delayMs={600}
      >
        {name
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 1)), "")}
      </AvatarFallback>
    </Avatar>
  );
};
