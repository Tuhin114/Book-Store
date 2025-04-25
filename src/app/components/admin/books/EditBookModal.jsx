"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function EditBookModal({
  open,
  onOpenChange,
  bookId,
  onSuccess,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "", // ISO date YYYY-MM-DD
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch book when modal opens
  useEffect(() => {
    if (!open) return;

    async function fetchBook() {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${bookId}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const year = data.publishYear;
        const iso = `${String(year).padStart(4, "0")}-01-01`;
        setFormData({
          title: data.title,
          author: data.author,
          date: iso,
        });
      } catch (err) {
        console.error("Failed to load book:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [open, bookId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.author.trim()) errs.author = "Author is required";
    if (!formData.date.trim()) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit updated book
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const publishYear = new Date(formData.date).getFullYear();
    const payload = {
      title: formData.title,
      author: formData.author,
      publishYear,
    };

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      onOpenChange(false);
      onSuccess && onSuccess();
      router.refresh();
    } catch (err) {
      console.error("Error updating book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {loading && (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          )}

          {!loading && (
            <>
              {/* Title */}
              <div className="grid gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Author */}
              <div className="grid gap-1">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={cn(errors.author && "border-red-500")}
                />
                {errors.author && (
                  <p className="text-xs text-red-500">{errors.author}</p>
                )}
              </div>

              {/* Date */}
              <div className="grid gap-1">
                <Label htmlFor="date">Published Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={cn(errors.date && "border-red-500")}
                />
                {errors.date && (
                  <p className="text-xs text-red-500">{errors.date}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
