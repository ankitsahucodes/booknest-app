import Header from "../components/Header";
import Footer from "../components/Footer";
import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, cart, handleAddtoCart } = useBookContext();
  return (
    <>
      <Header />
      <div className="container my-5">
        <h3 className="text-start">My Wishlist</h3>
        
        <div className="row g-4 mt-3">
          {wishlist?.length === 0 ? (
            <p>Your wishlist is currently empty.</p>
          ) : (
            wishlist?.map((book) => (
             
              <div key={book._id} className="col-md-3 my-3">
                <div className="card h-100 text-center shadow-sm border-0" style={{ maxWidth: "500px" }}>
                  <Link to={`/books/${book._id}`} className="text-decoration-none">
                    <img
                      src={book.imageUrl}
                      className="card-img-top img-fluid"
                      alt={book.title}
                      style={{
                          objectFit: "contain",
                          maxHeight: "300px",
                          width: "100%",
                        }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-dark">{book.title}</h5>
                      <h6 className="fw-bold text-muted">₹{book.price} </h6>
                    </div>
                  </Link>
                  

                  <div className="text-center">
                  <button
                className={`btn mb-2 w-75 ${
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
                    className="btn btn-outline-danger w-75"
                    onClick={() => removeFromWishlist(book._id)}
                  >
                    Remove from Wishlist
                  </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Wishlist;
