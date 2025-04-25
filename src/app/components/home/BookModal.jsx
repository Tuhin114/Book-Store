"use client";

import {
  Heart,
  Star,
  BookOpen,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BookModal = ({ book, onClose }) => {
  return (
    // <div
    //   className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
    //   onClick={onClose}
    // >
    //   <div
    //     onClick={(event) => event.stopPropagation()}
    //     className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
    //   >
    //     <AiOutlineClose
    //       className="absolute right-6 top-6 text-red-600 text-3xl cursor-pointer"
    //       onClick={onClose}
    //     />
    //     <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
    //       {book.publishYear}
    //     </h2>
    //     <h4 className="my-2 text-gray-500">{book._id}</h4>
    //     <div className="flex justify-start items-center gap-x-2">
    //       <PiBookOpenTextLight className="text-red-300 text-2xl" />
    //       <h2 className="my-1">{book.title}</h2>
    //     </div>
    //     <div className="flex justify-start items-center gap-x-2">
    //       <BiUserCircle className="text-red-300 text-2xl" />
    //       <h2 className="my-1">{book.author}</h2>
    //     </div>
    //     <p className="mt-4">Anything you want to show</p>
    //     <p className="my-2">
    //       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat eos
    //       dolore quia recusandae eaque saepe voluptatibus in laudantium
    //       doloremque. Tempore eaque aliquam tempora molestias error impedit
    //       officiis, harum ea placeat optio quo perferendis fugiat mollitia culpa
    //       laborum ipsam adipisci atque.
    //     </p>
    //   </div>
    // </div>
    <div className="bg-[var(--background)] min-h-screen text-[var(--white-soft)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <p className="text-sm text-[var(--pink-accent)] mb-4">
          Categories / Design / Graphic design / Product page
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* — Sidebar Icons — */}
          <div className="flex lg:flex-col justify-start lg:justify-center items-center gap-4">
            <button className="bg-[var(--white-soft)] rounded-lg p-2">
              <Heart className="w-5 h-5 text-[var(--background)]" />
            </button>
            <div className="bg-[var(--white-soft)] rounded-lg p-2 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 text-xs font-semibold text-[var(--background)]">
                4.8
              </span>
            </div>
            <button className="bg-[var(--white-soft)] rounded-lg p-2">
              <BookOpen className="w-5 h-5 text-[var(--background)]" />
            </button>
            <button className="bg-[var(--white-soft)] rounded-lg p-2">
              <ImageIcon className="w-5 h-5 text-[var(--background)]" />
            </button>
          </div>

          {/* — Cover + Tags — */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden">
              {/* replace src with your image */}
              <Image
                src="/placeholder-cover.jpg"
                alt="Book cover"
                width={500}
                height={700}
                className="w-full h-auto"
              />
            </div>
            <span className="absolute top-2 left-2 bg-[var(--background)] text-white text-xs font-medium px-2 py-1 rounded">
              -10%
            </span>
            <span className="absolute top-2 right-2 bg-[var(--white-soft)] text-[var(--background)] text-xs font-medium px-2 py-1 rounded">
              Design
            </span>
          </div>

          {/* — Details Column — */}
          <div className="lg:col-span-2 flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Grid systems in graphic design: A visual communication manual for
              graphic designers, typographers and three dimensional designers
            </h1>
            <p className="text-lg mb-6">Josef Müller‑Brockmann</p>

            {/* — Price Variants — */}
            <div className="flex gap-4 mb-6">
              {/* Paper */}
              <button className="bg-[#E6FF99] border border-[#E6FF99] rounded-lg p-4 flex flex-col items-center">
                <span className="text-sm mb-1">Paper</span>
                <span className="font-semibold text-base">
                  $90{" "}
                  <span className="text-[var(--gray-muted)] line-through text-sm">
                    $100
                  </span>
                </span>
              </button>

              {/* Digital */}
              <button className="border border-[#E6FF99] rounded-lg p-4 flex flex-col items-center">
                <span className="text-sm mb-1">Digital</span>
                <span className="font-semibold text-base">$50</span>
              </button>

              {/* Audio */}
              <button className="border border-[#E6FF99] rounded-lg p-4 flex flex-col items-center">
                <span className="text-sm mb-1">Audio</span>
                <span className="font-semibold text-base">$20</span>
              </button>
            </div>

            {/* — Code & Stock — */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-[var(--gray-muted)]">
                  Code{" "}
                  <span className="font-medium text-[var(--white-soft)]">
                    555673
                  </span>
                </p>
                <p className="text-sm text-[var(--pink-accent)]">3 left</p>
              </div>

              {/* Quantity selector + Buy button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="border border-[var(--white-soft)] rounded-full p-1"
                >
                  <Minus className="w-4 h-4 text-[var(--white-soft)]" />
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="border border-[var(--white-soft)] rounded-full p-1"
                >
                  <Plus className="w-4 h-4 text-[var(--white-soft)]" />
                </button>

                <Button className="ml-6 flex-1 bg-[#E6FF99] text-[var(--background)] font-bold px-6 py-3 rounded-full hover:opacity-90">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* — Tabs — */}
            <nav className="flex gap-4 mb-8">
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
                  className={`
                    px-4 py-2 rounded-full border 
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sit amet eros eu orci vehicula venenatis.
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
  );
};

export default BookModal;
