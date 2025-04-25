"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import BackButton from "@/app/components/BackButton";

const DeleteBookPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete book");

      alert("Book deleted successfully");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl text-center">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full rounded hover:bg-red-700"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBookPage;
