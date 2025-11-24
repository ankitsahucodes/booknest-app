import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const {
    loading,
    error,
    cartFull,
    handleAddToWishlist,
    wishlistBooks,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useBookContext();

  return (
    <>
      <div className="container my-5 ">
        <h3 className="text-center mb-4">
          My Cart {cartFull.length != 0 ? "(" + cartFull?.length + ")" : ""}
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
        {cartFull?.length ? (
          <div className="row ">
            <div className="col">
              {cartFull?.map((book) => {
                const inWishList = wishlistBooks.some(
                  (item) => item._id === book._id
                );

                return (
                  <div
                    className="card mb-3"
                    key={book._id}
                    style={{ maxWidth: "800px" }}
                  >
                    <div className="row g-4">
                      <div className="col-12 col-md-3 text-center p-3">
                        <Link
                          to={`/books/${book._id}`}
                          className="text-decoration-none"
                        >
                          <img
                            src={book.imageUrl}
                            className="img-fluid rounded"
                            alt={book.title}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              maxHeight: "200px",
                            }}
                          />
                        </Link>
                      </div>

                      <div className="col-12 col-md-9">
                        <div className="card-body">
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <div>
                              <Link
                                to={`/books/${book._id}`}
                                className="text-decoration-none"
                              >
                                <h5 className="card-title text-black mb-2">
                                  {book.title}
                                </h5>
                              </Link>

                              <h6 className="card-text mb-1 fs-5 fw-semibold text-success">
                                ₹{book.price}
                              </h6>
                            </div>

                            <div className="d-flex flex-column mt-2 mt-md-0">
                              <span className="fs-5 fw-bold text-success-emphasis">
                                Total: ₹{book.quantity * book.price}
                              </span>

                              <span className="text-success small fw-semibold fs-6 mt-2">
                                You Save: ₹
                                {(book.mrp - book.price) * book.quantity}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3 my-3">
                            <button
                              className="btn btn-dark btn-sm"
                              style={{ width: "35px" }}
                              onClick={() => decreaseQuantity(book._id)}
                            >
                              {book.quantity < 2 ? "🗑️" : "-"}
                            </button>

                            <span className="fw-bold">{book.quantity}</span>

                            <button
                              className="btn btn-dark btn-sm"
                              style={{ width: "35px" }}
                              onClick={() => increaseQuantity(book._id)}
                            >
                              +
                            </button>
                          </div>

                          <div className="d-flex flex-column flex-md-row justify-content-end gap-2 mt-3">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteFromCart(book._id)}
                            >
                              Remove
                            </button>

                            <button
                              className={`btn ${
                                inWishList
                                  ? "btn-secondary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => {
                                if (inWishList) {
                                  return;
                                }
                                handleAddToWishlist(book._id);
                              }}
                            >
                              {inWishList ? "Wishlisted" : "Add to Wishlist"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-4">
              <OrderSummary />
              <p className="text-start mt-1">
                Free delivery on order above 500
              </p>
              <div className="text-center mt-4">
                <Link to="/checkout" className="btn btn-success btn-lg mb-5">
                  CheckOut
                </Link>
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center fs-3">Your cart is currently empty 🛒</p>
          )
        )}
      </div>
    </>
  );
};

export default Cart;
