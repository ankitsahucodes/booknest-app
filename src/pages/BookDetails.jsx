import Header from "../components/Header";
import Footer from "../components/Footer";
import useBookContext from "../contexts/BookContext";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const {
    data,
    loading,
    error,
    wishlist,
    handleAddToWishlist,
    cart,
    handleAddtoCart,
  } = useBookContext();

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container text-center my-5">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div>
        <Header />
        <div className="container text-center my-5">
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  const book = data?.find((book) => book._id === String(bookId));

  if (!book) {
    return (
      <div>
        <Header />
        <div className="container text-center my-5">
          <p className="text-warning">Book not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container my-2">
        <Link to="/books" className="btn btn-outline-secondary mt-3 mb-4">
          ← Back to books
        </Link>
        <div className="row align-items-center mb-5 ">
          <div className="col-md-5 text-center">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>

          <div className="col-md-7 my-5">
            <h2>{book.title}</h2>
            <h5 className="text-muted mb-3">by {book.author}</h5>
            <p className="text-muted mb-1">⭐ {book.rating}</p>
            <h4 className="text-success mb-3">₹{book.price}</h4>
            <h5 className="text-muted mb-3">
              Published Year: {book.publishedYear}
            </h5>
            <h5 className="text-muted mb-3">Pages: {book.pages}</h5>

            <p className="text-muted">{book.summary}</p>

            <div className="d-flex gap-3 mt-4">
              <button
                className={`btn ${
                  cart.some((item) => item._id === book._id)
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => handleAddtoCart(book._id)}
              >
                {cart.some((item) => item._id === book._id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>




              <button
                className={`btn  ${
                  wishlist.some((item) => item._id === book._id)
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleAddToWishlist(book._id)}
              >
                {wishlist.some((item) => item._id === book._id)
                  ? "Already in Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookDetails;
