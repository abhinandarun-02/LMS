"use client"

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignupPage() {
  const { resolvedTheme } = useTheme();

  return <SignUp appearance={{  baseTheme:  resolvedTheme==='dark'? dark :  undefined,}}/>
}
