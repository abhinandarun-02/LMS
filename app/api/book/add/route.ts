import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'

export async function POST(
  req: Request,
) {
  try {

    const body = await req.json()

    const { title, edition, author, publisher, available } = body;


    if (!title) {
        return new NextResponse('Title is required', { status: 400 });
    }

    if (!edition) {
        return new NextResponse('Edition is required', { status: 400 });
    }

    if (!author) {
        return new NextResponse('Author is required', { status: 400 });
    }

    if (!publisher) {
        return new NextResponse('Publisher is required', { status: 400 });
    }

    if (available === undefined) {
        return new NextResponse('Availability is required', { status: 400 });
    }

    if (typeof available !== 'boolean') {
        return new NextResponse('Available must be a boolean', { status: 400 });
    }

    const book = await prismadb.books.create({
        data: {
            title,
            edition,
            author,
            publisher,
            available,
        },
        });
        console.log(book)

        return NextResponse.json(book);
    } catch (error) {
        console.log('[BOOKS_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}