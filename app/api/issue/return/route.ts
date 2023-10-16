import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { book_title, user_id } = body;

    if (!book_title) {
      return new NextResponse("Book Title is required", { status: 400 });
    }

    if (!user_id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const userIssues = await prismadb.issue.delete({
      where: {
        user_id: user_id,
        book_title: book_title,
      },
    });
    console.log(userIssues);

    return NextResponse.json(userIssues);
  } catch (error) {
    console.log("[USER_ISSUES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
