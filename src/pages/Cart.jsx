import Header from "../components/Header";
import Footer from "../components/Footer";
import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  const { cart, handleAddToWishlist, wishlist, deleteFromCart, increaseQuantity, decreaseQuantity } =
    useBookContext();

  
  return (
    <>
      <Header />
      <div className="container my-5 ">
        <h3 className="text-center mb-4">My Cart {cart.length != 0 ? "(" + (cart?.length) + ")" : ""}</h3>
        {cart?.length ? (
          <div className="row ">
            <div className="col-md-8">
              {cart?.map((book) => (
                <div
                  className="card mb-3"
                  key={book._id}
                  style={{ maxWidth: "800px" }}
                >
                  <div className="row g-0 ">
                    <div className="col-md-3">
                      <Link to={`/books/${book._id}`} className="text-decoration-none">
                      <img
                        src={book.imageUrl}
                        className="img-fluid rounded-start"
                        alt={book.title}
                        style={{
                          objectFit: "contain",
                          maxHeight: "300px",
                          width: "100%",
                        }}
                      />
                      </Link>
                    </div>

                    <div className="col-md-9 ">
                      <div className="card-body ms-4 ">
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                          <div>
                            <Link to={`/books/${book._id}`} className="text-decoration-none">
                            <h4 className="card-title text-black">{book.title}</h4></Link>
                            <h5 className="card-text mb-4">₹{book.price}</h5>

                            <button className="btn btn-info btn-sm" onClick={() => decreaseQuantity(book._id)} >-</button>
                            <span className="border border-0 mx-2">
                              {book.quantity}
                            </span>
                            <button className="btn btn-info btn-sm" onClick={() => increaseQuantity(book._id)} >+</button>
                          </div>

                          <span className="text-end mt-5 fs-5 fw-semibold text-primary-emphasis">
                            Total Price: ₹{book.quantity * book.price}
                          </span>
                        </div>

                        <div className="text-end mt-5">
                          <button
                            className="btn btn-outline-danger me-4"
                            onClick={() => deleteFromCart(book._id)}
                          >
                            Remove
                          </button>

                          <button
                            className={`btn ${
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
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <OrderSummary />
              <div className="text-center mt-4">
              <Link to="/checkout" className="btn btn-success btn-lg mb-5">
                  CheckOut
                  </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Your cart is currently empty.</p>
        )}
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Cart;
