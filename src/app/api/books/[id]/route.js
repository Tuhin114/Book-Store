// app/api/books/[id]/route.js
import Book from "@/models/Book";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = await params;
  await connectToDB();
  try {
    const book = await Book.findById(id);
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Add PUT and DELETE if needed similarly

export async function DELETE(_, { params }) {
  const { id } = await params;
  await connectToDB();
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  await connectToDB();
  try {
    const body = await request.json();
    console.log("Body:", body);
    const book = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
