import useBookContext from "../contexts/BookContext";
import { useParams, Link } from "react-router-dom";

const BookDetails = () => {
  const { bookId } = useParams();
  const {
    allBooks,
    loading,
    error,
    wishlistBooks,
    handleAddToWishlist,
    cartFull,
    handleAddToCart,
  } = useBookContext();

  if (loading) {
    return (
      <div>
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-3">Loading...</p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="container text-center my-5">
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  const book = allBooks?.find((book) => book._id === String(bookId));

  if (!book) {
    return (
      <div>
        <div className="container text-center my-5">
          <p className="text-warning">Book not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-2">
      <Link to="/books" className="btn btn-outline-secondary mt-2 mb-4">
        ← Back to books
      </Link>
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-7 p-5">
          <h2>{book.title}</h2>
          <h5 className="text-muted mb-3">by {book.author.join(" & ")}</h5>
          <p className="text-muted mb-1">⭐ {book.rating}</p>
          <div className="d-flex align-items-center gap-2 mt-2 my-2">
            <h4 className="fw-bold text-dark mb-0">₹{book.price}</h4>

            <h6 className="text-decoration-line-through text-muted mb-0">
              ₹{book.mrp}
            </h6>

            <span className="badge bg-success ms-2 fs-6">
              {Math.round(((book.mrp - book.price) / book.mrp) * 100)}% OFF
            </span>
          </div>

          <h5 className="text-muted mb-3">
            Published Year: {book.publishedYear}
          </h5>
          <h5 className="text-muted mb-3">Pages: {book.pages}</h5>

          <div className="d-flex gap-3 mt-4">
            <button
              className={`btn ${
                cartFull.some((item) => item._id === book._id)
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => {
                if (cartFull.some((item) => item._id === book._id)) return;
                handleAddToCart(book._id);
              }}
            >
              {cartFull.some((item) => item._id === book._id)
                ? "Added to Cart"
                : "Add to Cart"}
            </button>

            <button
              className={`btn  ${
                wishlistBooks.some((item) => item._id === book._id)
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => {
                if (wishlistBooks.some((item) => item._id === book._id)) return;
                handleAddToWishlist(book._id);
              }}
            >
              {wishlistBooks.some((item) => item._id === book._id)
                ? "Already in Wishlist"
                : "Add to Wishlist"}
            </button>
          </div>
          <p className="text-muted mt-3">
            <span className="text-dark fs-5 fw-semibold">Description:</span>
            <br />
            {book.summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
