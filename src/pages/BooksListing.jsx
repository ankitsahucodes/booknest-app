import useBookContext from "../contexts/BookContext";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function BooksListing() {
  const {
    data,
    loading,
    error,
    handleAddToWishlist,
    wishlistBooks,
    setCategory,
    cartFull,
    handleAddToCart,
  } = useBookContext();
  const { bookCategory } = useParams();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (bookCategory) {
      setCategory([bookCategory]);
    } else {
      setCategory([]);
    }
  }, [bookCategory, setCategory]);

  return (
    <>
      <div>
        <h3 className="text-center mt-4">
          Showing All Books ({data ? data?.length : "0"})
        </h3>
        <div className="d-grid gap-2 container mt-3">
          <button
            className="btn d-md-none mb-3 btn-dark"
            onClick={() => setShow(!show)}
          >
            {show ? "Close Filters" : "Filters"}
          </button>
        </div>
        <div className="mx-3 row">
          {/* Desktop Filter (always visible) */}
          <div className="col-md-3 d-none d-md-block shadow-sm p-5 mb-3 bg-body rounded">
            <div className="position-sticky" style={{ top: "50px" }}>
              <Filter />
            </div>
          </div>

          {/* Mobile Filter (shows when button clicked) */}
          {show && (
            <div className="col-12 d-md-none shadow-sm p-4 mb-3 bg-body rounded">
              <Filter />
            </div>
          )}

          <div className="col-12 col-md-9">
            {loading && (
              <div className="text-center my-5">
                <div
                  className="spinner-border text-success"
                  role="status"
                ></div>
                <p className="mt-3">Loading books...</p>
              </div>
            )}
            {error && <p className="display-5">Error: {error}</p>}

            <div className="row g-4 mt-3 mb-5">
              {data?.length > 0
                ? data?.map((book) => {
                    const isInCart = cartFull.some(
                      (item) => item._id === book._id
                    );
                    const isInWishlist = wishlistBooks.some(
                      (item) => item._id === book._id
                    );
                    const discountPercent = Math.round(
                      ((book.mrp - book.price) / book.mrp) * 100
                    );

                    return (
                      <div
                        key={book._id}
                        className="col-6 col-md-4 col-lg-3 col-sm-4"
                        style={{ paddingLeft: "6px", paddingRight: "6px" }}
                      >
                        <div className="card h-100 text-center shadow-sm border-0 ">
                          <Link
                            to={`/books/${book._id}`}
                            className="text-decoration-none"
                          >
                            <div className="position-relative">
                              <img
                                src={book.imageUrl}
                                className="card-img-top"
                                alt={book.title}
                                style={{
                                  height: "220px",
                                  width: "100%",
                                  objectFit: "contain",
                                  background: "rgba(255, 255, 255, 1)",
                                }}
                              />

                              <div
                                className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-dark text-warning rounded"
                                style={{ fontSize: "0.85rem", opacity: 0.8 }}
                              >
                                ★ {book.rating}
                              </div>
                            </div>

                            <div className="card-body py-4 ">
                              <h5
                                className="card-title text-muted"
                                style={{ minHeight: "38px" }}
                              >
                                {book.title}
                              </h5>

                              <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                                <h6 className="fw-bold text-dark mb-0">
                                  ₹{book.price}
                                </h6>

                                <h6 className="text-decoration-line-through text-muted mb-0 small">
                                  ₹{book.mrp}
                                </h6>

                                <span className="badge bg-success">
                                  {discountPercent}% OFF
                                </span>
                              </div>
                            </div>
                          </Link>

                          <div>
                            <button
                              className={`btn w-100 mb-2 ${
                                isInCart ? "btn-success" : "btn-outline-success"
                              }`}
                              onClick={() => {
                                if (isInCart) return;
                                handleAddToCart(book._id);
                              }}
                            >
                              {isInCart ? "Added to Cart" : "Add to Cart"}
                            </button>
                            <button
                              className={`btn w-100 ${
                                isInWishlist
                                  ? "btn-secondary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => {
                                if (isInWishlist) return;
                                handleAddToWishlist(book._id);
                              }}
                            >
                              {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : !loading && (
                    <p className="border border-info bg-info p-4 bg-opacity-10">
                      No Books found.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksListing;
