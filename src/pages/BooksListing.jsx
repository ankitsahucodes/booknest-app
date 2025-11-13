import Header from "../components/Header";
import Footer from "../components/Footer";
import useBookContext from "../contexts/BookContext";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function BooksListing() {
  const {
    data,
    loading,
    error,
    handleAddToWishlist,
    wishlist,
    setCategory,
    cart,
    handleAddtoCart,
  } = useBookContext();
  const { bookCategory } = useParams();

  useEffect(() => {
    if (bookCategory) {
      setCategory([bookCategory]);
    } else {
      setCategory([]);
    }
  }, [bookCategory, setCategory]);

 
  return (
    <>
      <Header />
      <div className="mx-5 my-5">
        <h3 className="text-center">Showing All Books ({data ? data?.length : "0"})</h3>
        

        <div className="mx-5 row">
          <div className="col-md-3 text-start shadow-sm p-3 mb-5 bg-body rounded">
            <div className="position-sticky " style={{ top: "50px" }}>
              <Filter />
            </div>
          </div>

          <div className="col-md-9">
            {loading && <p className="border border-success bg-success p-4 bg-opacity-50">Loading...</p>}
            {error && <p className="display-5">Error: {error}</p>}

            <div className="row g-4 mt-3 mb-5">
              {data?.length > 0
                ? data?.map((book) => (
                    <div key={book._id} className="col-md-3">
                      <div className="card h-100 text-center shadow-sm border-0 ">
                        <Link
                          to={`/books/${book._id}`}
                          className="text-decoration-none"
                        >
                          
                          <img
                            src={book.imageUrl}
                            className="card-img-top"
                            alt={book.title}
                            
                          />
                          
                          <div className="card-body">
                            <h5 className="card-title text-muted">
                              {book.title}
                            </h5>
                            <h6 className="fw-bold text-dark">
                              ₹{book.price}{" "}
                            </h6>
                          </div>
                        </Link>

                        <div>
                          <button
                            className={`btn w-100 mb-2 ${
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
                            className={`btn w-100 ${
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
                  ))
                : !loading && <p className="border border-info bg-info p-4 bg-opacity-10">No Books found.</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BooksListing;
