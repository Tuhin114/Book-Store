import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const BooksTable = ({ books }) => {
  // Destructuring books from props
  const [error] = useState(false);

  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>{/* Your existing code for table headers */}</thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan="5" className="text-center">
                Error fetching books
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
