import useBookContext from "../contexts/BookContext";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const {
    wishlistBooks,
    removeFromWishlist,
    cartFull,
    handleAddToCart,
    loading,
    error,
  } = useBookContext();

  const navigate = useNavigate()
  return (
    <>
      <div className="container mb-3 mt-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back to books
        </button>
        <h3 className="text-center my-4 mb-2">
          My Wishlist{" "}
          {wishlistBooks?.length != 0 ? "(" + wishlistBooks?.length + ")" : ""}
        </h3>

        <div>
          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="mt-3">Loading books...</p>
            </div>
          )}

          {error && <p className="display-5">Error: {error}</p>}
        </div>

        <div className="row g-4 mt-3">
          {wishlistBooks?.length === 0
            ? !loading && (
                <p className="fs-3 text-center">
                  Your wishlist is currently empty.
                </p>
              )
            : wishlistBooks?.map((book) => {
                const discountPercent = Math.round(
                  ((book.mrp - book.price) / book.mrp) * 100
                );

                const isInCart = cartFull?.some(
                  (item) => item._id === book._id
                );
                return (
                  <div key={book._id} className="col-md-3 my-3 col-12 col-lg-3">
                    <div
                      className="card h-100 text-center mb-4 shadow-sm border-0"
                      style={{ maxWidth: "500px" }}
                    >
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

                      <div className="text-center">
                        <button
                          className={`btn mb-3 w-75 ${
                            isInCart ? "btn-success" : "btn-outline-success"
                          }`}
                          onClick={() => {
                            if (isInCart) return;
                            handleAddToCart(book._id);
                          }}
                        >
                          {isInCart ? "Added to Cart" : "Move to Cart"}
                        </button>

                        <button
                          className="btn btn-outline-danger w-75"
                          onClick={() => removeFromWishlist(book._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
