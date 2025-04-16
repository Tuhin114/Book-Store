import { Schema, model, models } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Book = models.Book || model("Book", BookSchema);
export default Book;
