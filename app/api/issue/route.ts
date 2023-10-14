import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const issue = await prismadb.issue.findMany();

    return NextResponse.json(issue);
  } catch (error) {
    console.log("[ISSUE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
