"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import Spinner from "@/app/components/Spinner";

import {
  Heart,
  Star,
  BookOpen,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { Headphones } from "lucide-react";

const ShowBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  return (
    <div className="">
      <BackButton />
      <h1 className="text-3xl">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        // <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        //   <div className="my-4">
        //     <span className="text-xl mr-4 text-gray-500">Id:</span>
        //     <span>{book._id}</span>
        //   </div>
        //   <div className="my-4">
        //     <span className="text-xl mr-4 text-gray-500">Title:</span>
        //     <span>{book.title}</span>
        //   </div>
        //   <div className="my-4">
        //     <span className="text-xl mr-4 text-gray-500">Author:</span>
        //     <span>{book.author}</span>
        //   </div>
        //   <div className="my-4">
        //     <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
        //     <span>{book.publishYear}</span>
        //   </div>
        // </div>
        <div className="flex flex-col bg-[var(--background)] text-[var(--white-soft)] px-20 items-center">
          <div className="">
            <div className="flex text-[var(--gray-muted)] text-sm md:text-lg gap-1 py-4">
              <Link
                href="/"
                className="hover:text-[var(--pink-accent)] hover:underline"
              >
                Home
              </Link>
              <span>/</span>
              <span>Product</span>
              <span>/</span>
              <span className="text-[var(--pink-accent)]">{book.title}</span>
            </div>

            <div className="mt-6">
              <div className="flex gap-10">
                <div className="flex gap-2 h-120">
                  <div className="flex flex-col justify-between items-end py-8">
                    {/* Top group */}
                    <div className="flex flex-col items-center space-y-2">
                      {/* 1) Heart – rounded top corners */}
                      <button className="w-12 h-16 bg-[var(--white-soft)] flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                        <Heart className="w-8 h-8 text-[var(--background)]" />
                      </button>

                      {/* 2) Star + rating – same height, a little wider */}
                      <button className="min-w-[3.25rem] h-16 bg-[var(--white-soft)] flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                        <Star className="w-5 h-5 text-[var(--background)]" />
                        <span className="ml-1 text-xs font-semibold text-[var(--background)]">
                          4.8
                        </span>
                      </button>
                    </div>

                    {/* Bottom group */}
                    <div className="flex flex-col items-end space-y-2">
                      {/* 3) BookOpen – square corners */}
                      <button className="w-8 h-12 bg-[var(--white-soft)] flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                        <BookOpen className="w-5 h-5 text-[var(--background)]" />
                      </button>

                      {/* 4) ImageIcon – rounded bottom corners */}
                      <button className="w-8 h-16 bg-[var(--white-soft)] flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                        <ImageIcon className="w-5 h-5 text-[var(--background)]" />
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative w-88 h-120 rounded-xl overflow-hidden">
                      {/* replace src with your image */}
                      <Image
                        src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667708346i/43641.jpg"
                        alt="Book cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute top-2 left-2 bg-[var(--background)] text-white text-xs font-medium px-2 py-1 rounded-full">
                      -10%
                    </span>
                    <span className="absolute top-2 right-2 bg-[var(--white-soft)] text-[var(--background)] text-xs font-medium px-2 py-1 rounded-full">
                      Design
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 px-5 w-full">
                  <h1 className="text-2xl font-semibold mb-2 line-clamp-3 break-words whitespace-normal mr-10">
                    Grid systems in graphic design:
                    <br />A visual communication manual for graphic designers,
                    <br />
                    typographers and three dimensional designers
                  </h1>

                  <p className="text-lg py-2">Josef Müller-Brockmann</p>

                  <div className="flex justify-between">
                    <div className="flex gap-4 mb-6">
                      {/* Paper */}
                      <button className="w-26 bg-[var(--yellow-bright)] text-[var(--background)] border border-[var(--yellow-bright)] rounded-2xl p-2  flex flex-col items-start">
                        <span className="text-md mb-1 font-bold flex items-center gap-1">
                          <span>
                            <Book />
                          </span>
                          Paper
                        </span>
                        <span className="font-extrabold text-3xl flex flex-col items-start">
                          $90{" "}
                          <span className="text-[var(--gray-muted)] line-through text-sm font-semibold">
                            $100
                          </span>
                        </span>
                      </button>

                      {/* Digital */}
                      <button className="w-26  text-[var(--yellow-bright)] border border-[var(--yellow-bright)] rounded-2xl p-2 flex flex-col items-start">
                        <span className="text-md mb-1 font-semibold flex items-center gap-1">
                          <span>
                            <ArrowDownToLine />
                          </span>
                          Digital
                        </span>
                        <span className="font-semibold text-3xl">$50</span>
                      </button>

                      {/* Audio */}
                      <button className="w-26  text-[var(--yellow-bright)] border border-[var(--yellow-bright)] rounded-2xl p-2 flex flex-col items-start">
                        <span className="text-md mb-1 font-semibold flex items-center gap-1">
                          <span>
                            <Headphones />
                          </span>
                          Audio
                        </span>
                        <span className="font-semibold text-3xl">$20</span>
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg text-[var(--gray-muted)]">
                        Code{" "}
                        <span className="font-medium text-[var(--white-soft)]">
                          555673
                        </span>
                      </p>
                      <p className="text-sm text-[var(--pink-accent)] items-end">
                        3 left
                      </p>
                    </div>
                  </div>

                  <div className="text-lg text-[var(--white-soft)]">
                    <p className="">Publisher - Nigglis Werleg</p>
                    <p className="">Year - 2022</p>
                    <p className="">Language - English</p>
                    <p className="">HardCover - 250 pages</p>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Quantity selector + Buy button */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="border border-[var(--white-soft)] rounded-full p-1"
                      >
                        <Minus className="w-4 h-4 text-[var(--white-soft)]" />
                      </button>
                      <span className="w-12 text-center border border-[var(--white-soft)] rounded-full p-1">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="border border-[var(--white-soft)] rounded-full p-1"
                      >
                        <Plus className="w-4 h-4 text-[var(--white-soft)]" />
                      </button>

                      <Button className="ml-6 h-12 w-96 flex-1 bg-[var(--yellow-bright)] text-[var(--background)] text-xl font-bold px-6 py-2 rounded-full ">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* — Details Column — */}
              <div className="flex flex-col mt-8 w-full">
                {/* — Tabs — */}
                <nav className="grid grid-cols-6 gap-4 mb-8 w-full">
                  {[
                    "Description",
                    "Characteristic",
                    "About author",
                    "For whom",
                    "Reviews",
                    "Delivery",
                  ].map((tab, i) => (
                    <button
                      key={i}
                      className={`w-full px-4 py-2 rounded-full border text-sm font-medium
          ${
            tab === "Reviews"
              ? "bg-[var(--white-soft)] text-[var(--background)]"
              : "border-[var(--white-soft)] text-[var(--white-soft)]"
          }
        `}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>

                {/* — Reviews — */}
                <div className="space-y-6">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                        {/* avatar placeholder */}
                        <span className="text-xl text-white">A</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400" />
                          ))}
                          <span className="ml-2 font-semibold">Ayca Demir</span>
                          <span className="ml-2 text-sm text-[var(--gray-muted)]">
                            Jun 20 2024
                          </span>
                        </div>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Curabitur sit amet eros eu orci vehicula
                          venenatis.
                        </p>
                      </div>
                    </div>
                  ))}

                  <Button className="self-start border border-[#E6FF99] text-[#E6FF99] px-6 py-2 rounded-full hover:bg-[#E6FF99] hover:text-[var(--background)] transition">
                    Leave a review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBookPage;
