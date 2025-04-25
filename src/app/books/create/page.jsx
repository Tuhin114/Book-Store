"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CreateBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(new Date().getFullYear());

  const [coverFile, setCoverFile] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, author, publishYear };

    setLoading(true);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error("Error creating book:", await res.text());
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-[var(--background)] px-4 md:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--white-soft)]">
          Add Book
        </h1>
        <nav className="flex text-[var(--gray-muted)] text-sm md:text-lg mt-2 gap-1">
          <Link
            href="/"
            className="hover:text-[var(--pink-accent)] hover:underline"
          >
            Home
          </Link>
          <span>/</span>
          <span>Admin</span>
          <span>/</span>
          <span className="text-[var(--pink-accent)]">Add Book</span>
        </nav>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Cover Upload */}
        <div className="md:col-span-1 bg-[var(--white-soft)] rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Cover Image</h2>

          {coverPreview ? (
            <div className="relative w-full aspect-[3/4] mb-4 rounded-lg overflow-hidden">
              <Image
                src={coverPreview}
                alt="Cover preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverFile(null)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ) : (
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center mb-4">
              <Upload className="h-12 w-12 text-gray-500 mb-2" />
              <p className="text-gray-500">Upload cover image</p>
            </div>
          )}

          <label className="cursor-pointer w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setCoverFile(e.target.files[0]);
              }}
            />
            <div className="w-full text-center py-2 border rounded-full text-lg font-semibold">
              {coverPreview ? "Change Image" : "Upload Image"}
            </div>
          </label>
        </div>

        {/* Details */}
        <div className="md:col-span-2 bg-[var(--white-soft)] rounded-xl p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--background)] mb-6">
            Book Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-[var(--background)]">
                Title <span className="text-pink-400">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                required
                className=""
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="author" className="text-[var(--background)]">
                Author <span className="text-pink-400">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="publishYear" className="text-[var(--background)]">
                Publish Year <span className="text-pink-400">*</span>
              </Label>
              <Input
                id="publishYear"
                name="publishYear"
                type="number"
                min={1000}
                max={new Date().getFullYear()}
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.valueAsNumber || "")}
                placeholder="YYYY"
                required
              />
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none bg-[var(--yellow-bright)] text-[var(--background)] font-bold text-xl py-4 rounded-full hover:bg-[var(--background)] hover:text-[var(--white-soft)] hover:border hover:border-[var(--white-soft)]"
            >
              {loading ? <Spinner size="sm" /> : "Add Book"}
            </Button>
            <Link href="/">
              <Button
                type="button"
                className="flex-1 sm:flex-none bg-[var(--gray-muted)] text-[var(--background)] font-bold text-xl py-4 rounded-full hover:bg-[var(--background)] hover:text-[var(--white-soft)] hover:border hover:border-[var(--white-soft)]"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
