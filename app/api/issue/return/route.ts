import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { book_id } = body;

    console.log(book_id);

    const u_id = await prismadb.issue.findFirst({
      where: { book_id: book_id },
      select: { user_id: true, id: true },
    });

    console.log(u_id);

    if (!u_id || !book_id) {
      return new NextResponse("User id or book title is empty", {
        status: 400,
      });
    }
    if (!book_id) {
      return new NextResponse("Book id is required", { status: 400 });
    }

    const { user_id: user_id, id: id } = u_id;

    const userIssues = await prismadb.issue.delete({
      where: {
        id: id,
        book_id: book_id,
        user_id: user_id,
      },
    });
    console.log(userIssues);
    await prismadb.books.update({
      where: { id: book_id },
      data: { available: true },
    });
    return NextResponse.json(userIssues);
  } catch (error) {
    console.log("[USER_ISSUES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
