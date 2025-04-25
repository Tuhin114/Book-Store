import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiUserCircle, BiPencil, BiTrash, BiShow } from "react-icons/bi";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const BooksSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(book);

  return (
    <Card className="w-[16rem] bg-[var(--background)] rounded-lg">
      <CardContent className="p-0">
        <div className="w-full relative h-[21rem] bg-[var(--white-soft)] rounded-2xl overflow-hidden">
          {/* Dummy cover; replace with your own */}
          <Image
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667708346i/43641.jpg"
            alt="Dummy Book"
            width={184}
            height={248}
            className="w-full h-full object-cover p-10 rounded-2xl"
          />

          <div className="absolute top-4 left-4 flex items-center justify-center bg-[var(--background)] text-[var(--white-soft)] font-semibold rounded-full p-1.5">
            -20%
          </div>

          {/* Favorite heart */}
          <div className="absolute top-4 right-4 flex items-center justify-center bg-[var(--background)] rounded-full p-1.5">
            <button className="text-[var(--white-soft)] hover:text-[var(--gray-muted)] cursor-pointer">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-0 py-2 flex flex-col items-start gap-1">
        {/* Book title */}
        <div className="text-base font-semibold text-[var(--white-soft)] line-clamp-1 cursor-pointer hover:text-[var(--gray-muted)]">
          <Link href={`/books/${book._id}`} className="hover:underline">
            {book.title}
          </Link>
        </div>

        <div className="text-sm text-[var(--gray-muted)]">{book.author}</div>

        <div className="flex items-baseline gap-2">
          {/* Current price */}
          <span className="text-base font-semibold text-[var(--white-soft)]">
            $20
          </span>
          {/* Original price */}
          <span className="text-xs text-[var(--gray-muted)] line-through">
            $25
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BooksSingleCard;
