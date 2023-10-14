import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { book_id, user_id, overdue } = body;

    if (!book_id) {
      return new NextResponse("Book ID is required", { status: 400 });
    }

    if (!user_id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    if (typeof overdue !== "boolean") {
      return new NextResponse("Overdue must be a boolean", { status: 400 });
    }

    const bookTitleRecord = await prismadb.books.findFirst({
      where: { id: book_id },
      select: { title: true },
    });
    const userRecord = await prismadb.user.findFirst({
      where: { rollNumber: user_id },
      select: { name: true },
    });

    if (!bookTitleRecord || !userRecord) {
      return new NextResponse("Book title and user name is empty", {
        status: 400,
      });
    }

    const { title: book_title } = bookTitleRecord;
    const { name: user_name } = userRecord;
    console.log(bookTitleRecord);
    console.log(userRecord);

    const currentDate: Date = new Date();
    const formattedDate: string = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    }).format(currentDate);

    const issue = await prismadb.issue.create({
      data: {
        created_at: formattedDate,
        book_id,
        book_title,
        user_id,
        user_name,
        overdue,
      },
    });
    console.log(issue);

    const updateAvailability = await prismadb.books.update({
      where: { id: book_id },
      data: { available: false },
    });

    console.log(updateAvailability);

    return NextResponse.json(issue);
  } catch (error) {
    console.log("[ISSUE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
