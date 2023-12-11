
import PropTypes from 'prop-types'; // Import PropTypes
import BooksSingleCard from './BooksSingleCard';

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <BooksSingleCard key={item._id} book={item}/>
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
