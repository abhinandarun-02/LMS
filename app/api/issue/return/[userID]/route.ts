import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userID: string } }
) {
  try {
    if (!params.userID) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const userIssues = await prismadb.issue.findMany({
      where: {
        user_id: params.userID,
        overdue: false,
      },
      select: {
        book_id: true,
        book_title: true,
      },
    });

    return NextResponse.json(userIssues);
  } catch (error) {
    console.log("[USER_ISSUE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function DELETE(
//     req: Request,
//     { params }: { params: { bookId: string } }
//   ) {
//     try {
//       const { userId } = auth()

//       if (!userId) {
//         return new NextResponse('Unauthenticated', { status: 403 })
//       }

//       if (!params.bookId) {
//         return new NextResponse('Book id is required', { status: 400 })
//       }

//       const book = await prismadb.books.delete({
//         where: {
//           id: params.bookId
//         }
//       })

//       return NextResponse.json(book)
//     } catch (error) {
//       console.log('[BOOK_DELETE]', error)
//       return new NextResponse('Internal error', { status: 500 })
//     }
//   }

//   export async function PATCH(
//     req: Request,
//     { params }: { params: { bookId: string } }
//   ) {
//     try {
//       const { userId } = auth()

//       if (!userId) {
//         return new NextResponse('Unauthenticated', { status: 403 })
//       }

//       const body = await req.json()

//       const { title, edition, author, publisher, available } = body;

//       if (!title) {
//           return new NextResponse('Title is required', { status: 400 });
//       }

//       if (!edition) {
//           return new NextResponse('Edition is required', { status: 400 });
//       }

//       if (!author) {
//           return new NextResponse('Author is required', { status: 400 });
//       }

//       if (!publisher) {
//           return new NextResponse('Publisher is required', { status: 400 });
//       }

//       if (available === undefined) {
//           return new NextResponse('Availability is required', { status: 400 });
//       }

//       if (typeof available !== 'boolean') {
//           return new NextResponse('Available must be a boolean', { status: 400 });
//       }

//       const book = await prismadb.books.update({
//         where: {
//           id: params.bookId
//         },
//         data: {
//           title,
//           author,
//           publisher,
//           edition,
//           available,
//         }
//       })

//       return NextResponse.json(book)
//     } catch (error) {
//       console.log('[BOOK_PATCH]', error)
//       return new NextResponse('Internal error', { status: 500 })
//     }
//   }
