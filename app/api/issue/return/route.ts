import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user_id = req.query;
    // console.log(user_id);

    // const userID = String(user_id);
    // // console.log(userID);

    // const userIssues = await prismadb.issue.findMany({
    //   where: { user_id: userID, overdue: false },
    //   select: { book_title: true },
    // });

    // console.log(userIssues);

    // res.status(200).json({ message: user_id });
    return NextResponse.json(user_id);
  } catch (error) {
    console.log("[ISSUE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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

    if (!overdue) {
      return new NextResponse("Issue is overdue", { status: 400 });
    }

    const issue = await prismadb.issue.deleteMany({
      where: {
        book_id: book_id,
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
    console.log("[RETURN_ISSUE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
