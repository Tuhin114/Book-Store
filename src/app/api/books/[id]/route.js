// app/api/books/[id]/route.js
import { NextResponse } from "next/server";
import { Book } from "@/lib/models/bookModel";
import connectDB from "@/lib/config";

export async function GET(_, { params }) {
  await connectDB();
  try {
    const book = await Book.findById(params.id);
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Add PUT and DELETE if needed similarly

export async function DELETE(_, { params }) {
  await connectDB();
  try {
    const book = await Book.findByIdAndDelete(params.id);
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(_, { params, request }) {
  await connectDB();
  try {
    const body = await request.json();
    const book = await Book.findByIdAndUpdate(params.id, body, { new: true });
    if (!book)
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
