"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Clock, Grid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/app/components/Spinner";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import { cn } from "@/lib/utils";
import BookCard from "./BookCard";

export default function BookList() {
  const [viewMode, setViewMode] = useState("table");
  const [filter, setFilter] = useState("all");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const placeholderCover =
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667708346i/43641.jpg";

  // map raw book data -> UI shape
  const mapRawToUI = (raw) => ({
    id: raw._id,
    title: raw.title,
    author: raw.author,
    category: "Uncategorized",
    status: "live",
    date: String(raw.publishYear),
    cover: placeholderCover,
  });

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      const mapped = (data.data || []).map(mapRawToUI);
      setBooks(mapped);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filtered =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchBooks();
  };

  const handleEditClick = (id) => {
    setEditBookId(id);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditBookId(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;
    console.log(id);
    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" });
      fetchBooks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Books</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {
                  {
                    all: "All Books",
                    draft: "Drafts",
                    scheduled: "Scheduled",
                    live: "Live",
                  }[filter]
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All Books
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("draft")}>
                  Drafts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("scheduled")}>
                  Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("live")}>
                  Live
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1 border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : viewMode === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]" />
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="h-12 w-8 bg-secondary flex items-center justify-center rounded overflow-hidden">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "status-badge",
                        book.status === "draft"
                          ? "status-draft"
                          : book.status === "scheduled"
                          ? "status-scheduled"
                          : "status-live"
                      )}
                    >
                      {book.status === "scheduled" && (
                        <Clock className="h-3 w-3" />
                      )}
                      {book.status === "live" && <Check className="h-3 w-3" />}
                      <span>
                        {book.status === "draft"
                          ? "Draft"
                          : book.status === "scheduled"
                          ? book.date
                          : "Live"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditClick(book.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            /* schedule logic */
                          }}
                        >
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <AddBookModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={handleAddSuccess}
      />

      {editBookId && (
        <EditBookModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          bookId={editBookId}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
