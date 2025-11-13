import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Checkout = () => {
  function handlePlaceOrder() {
    const addressChecked = document.getElementById("address").checked;

    {
      addressChecked
        ? toast.success("🎉 Order Placed Successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          })
        : toast.error("⚠️ Please select an address before placing the order!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="container mt-5">
        <Link to="/cart" className="btn btn-outline-secondary">
          ← Back to Cart
        </Link>

        <div>
          <div className="card my-4 ">
            <label htmlFor="address">
              <div className="card-body">
                <input type="radio" name="address" id="address" />
                <strong> Address: </strong> Raipur, Chhattisgarh, 490042
              </div>
            </label>
          </div>
        </div>

        <div className="py-5">
          <OrderSummary />
        </div>
        
        <div className="mb-5">
        <button
          id="placeOrderBtn"
          onClick={handlePlaceOrder}
          className="btn btn-success d-grid gap-2 col-6 mx-auto "
        >
          Place Order
        </button>
        </div>
        

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
