"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "./components/Spinner";
import BooksTable from "./components/home/BooksTable";
import BooksCard from "./components/home/BooksCard";
import { ArrowDownRight, MoveDownRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[var(--white-soft)] text-4xl my-8">
          Books List
        </h1>
        <Link href="/admin/books">
          <Button className="flex items-center gap-2 bg-[var(--green-soft)] text-[var(--background)] font-semibold text-lg px-4 py-2 rounded-full hover:bg-[var(--background)] hover:text-[var(--white-soft)] hover:border hover:border-[var(--white-soft)] mr-8 ">
            <Plus className="h-5 w-5" />
            Admin
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-16">
          {/* Nav */}
          <nav className="flex flex-col space-y-4 items-start">
            <button className="inline-flex items-center px-8 py-3 text-4xl font-bold rounded-full border border-[var(--pink-accent)] text-[var(--pink-accent)] hover:bg-[var(--pink-accent)] hover:text-black transition">
              All books
              <span className="ml-3 mt-2 old">
                <ArrowDownRight size={30} strokeWidth={3} absoluteStrokeWidth />
              </span>
            </button>

            <button className="inline-flex items-center px-8 py-3 text-4xl font-bold rounded-full border border-[var(--pink-accent)] text-[var(--pink-accent)] hover:bg-[var(--pink-accent)] hover:text-black transition">
              New
            </button>

            <button className="inline-flex items-center px-8 py-3 text-4xl font-bold rounded-full border border-[var(--pink-accent)] text-[var(--pink-accent)] hover:bg-[var(--pink-accent)] hover:text-black transition">
              Best sellers
            </button>

            <button className="inline-flex items-center px-8 py-3 text-4xl font-bold rounded-full border border-[var(--pink-accent)] text-[var(--pink-accent)] hover:bg-[var(--pink-accent)] hover:text-black transition">
              Sale
            </button>
          </nav>

          {/* Your cards */}
          <BooksCard books={books} />
        </div>
      )}
    </div>
  );
};

export default Home;
