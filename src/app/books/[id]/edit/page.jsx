"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import BackButton from "@/app/components/BackButton";

const EditBookPage = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) console.log("Error fetching book:", res.statusText);
        console.log("Response:", res);
        const data = await res.json();
        console.log("Book data:", data);
        setTitle(data.title);
        setAuthor(data.author);
        setPublishYear(data.publishYear);
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching the book.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };

    console.log("Data to be sent:", data);

    setLoading(true);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update book");
      alert("Book Edited Successfully");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error editing book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleEditBook}
          className="p-2 bg-sky-300 m-8 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBookPage;
