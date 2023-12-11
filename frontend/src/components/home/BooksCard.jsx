import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiPencil, BiTrash } from 'react-icons/bi'; // Import BiPencil and BiTrash icons
import { BsInfoCircle } from 'react-icons/bs';
import PropTypes from 'prop-types'; // Import PropTypes

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <div key={item._id} className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
          <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>{item.publishYear}</h2>
          <h4 className='my-2 text-gray-500'>{item._id}</h4>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl' />
            <h2 className='my-1'>{item.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <h2 className='my-1'>{item.author}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2 mt-4 p-4'>
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
              <BiPencil className='text-2xl text-yellow-800 hover:text-black' /> {/* Replace with BiPencil */}
            </Link>
            <Link to={`/books/delete/${item._id}`}>
              <BiTrash className='text-2xl text-red-800 hover:text-black' /> {/* Replace with BiTrash */}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
BooksCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      // Add more PropTypes for other properties if necessary
    })
  ).isRequired,
};

export default BooksCard;
