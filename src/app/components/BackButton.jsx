"use client";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <div className="flex">
      <Link href="/" className="bg-sky-800 text-white px-4 py-1 rounded-lg">
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
