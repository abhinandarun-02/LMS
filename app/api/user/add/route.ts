import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { rollNumber, name, email, phone, role } = body;

    if (!rollNumber) {
      return new NextResponse("Roll Number is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!role) {
      return new NextResponse("Role is required", { status: 400 });
    }

    // if (role != "teacher" || role != "student") {
    //   return new NextResponse("Role must be student or teacher", {
    //     status: 400,
    //   });
    // }

    const user = await prismadb.user.create({
      data: {
        rollNumber,
        name,
        email,
        phone,
        role,
      },
    });
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.log("[BOOKS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
