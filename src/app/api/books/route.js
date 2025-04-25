import Book from "@/models/Book";
import { connectToDB } from "@/utils/database";

import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const books = await Book.find({});
    return NextResponse.json(
      { count: books.length, data: books },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDB();
  try {
    const body = await request.json();
    const { title, author, publishYear } = body;

    if (!title || !author || !publishYear) {
      return NextResponse.json(
        { message: "Send all required fields: title, author, publishYear" },
        { status: 400 }
      );
    }

    const book = await Book.create({ title, author, publishYear });
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
