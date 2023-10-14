import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const books = await prismadb.books.findMany({
      where: {
        available: true,
      },
      select: {
        id: true,
        title: true,
        author: true,
        publisher: true,
        edition: true,
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.log("[BOOKS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
