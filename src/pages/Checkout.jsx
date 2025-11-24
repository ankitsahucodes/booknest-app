import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useBookContext from "../contexts/BookContext";

const Checkout = () => {
  const { cart, setCart, allBooks, userId, totalItems, totalAmount } =
    useBookContext();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAddresses() {
      if (!userId) return;

      try {
        const res = await fetch(`https://booknest-backend-webapp.vercel.app/address/${userId}`);
        const data = await res.json();
        setAddresses(data);
      } catch (error) {
        console.log("Address fetch error:", error);
      }
    }

    fetchAddresses();
  }, [userId]);

  async function handlePlaceOrder() {
    if (!selectedAddress) {
      return toast.error(
        "⚠️ Please select an address before placing the order!",
        {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
        }
      );
    }

    const address = addresses.find((a) => a._id === selectedAddress);

    const orderData = {
      items: cart.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        price: allBooks.find((b) => b._id === item.bookId).price,
      })),
      totalItems: totalItems,
      totalAmount: totalAmount,
      address,
    };

    const response = await fetch(
      `https://booknest-backend-webapp.vercel.app/order-placed/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }
    );

    // const saveData = await response.json();

    if (response.ok) {
      toast.success("🎉 Order Placed Successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
      setCart([]);
    } else {
      toast.error("Failed to place order!");
    }
  }

  const handleDeleteAddress = async (addressId) => {
    try {
      const res = await fetch(
        `https://booknest-backend-webapp.vercel.app/address/${userId}/${addressId}`,
        { method: "DELETE" }
      );

      const updated = await res.json();
      setAddresses(updated);
      toast.success("Address deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <Link to="/cart" className="btn btn-outline-secondary">
          ← Back to Cart
        </Link>

        <h4 className="mt-4">Select Delivery Address</h4>

        {addresses.length === 0 && (
          <div className="alert alert-warning mt-3">
            No addresses saved. Please add an address.
          </div>
        )}

        {addresses.map((addr) => (
          <div className="card my-3" key={addr._id}>
            <label>
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <input
                    type="radio"
                    name="address"
                    onChange={() => setSelectedAddress(addr._id)}
                    className="form-check-input me-2"
                  />
                  <strong>Address:</strong>
                  <br />
                  {addr.houseNumber}, {addr.street} <br />
                  {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
                </div>

                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-warning me-3"
                    onClick={() => navigate(`/add-address?edit=${addr._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteAddress(addr._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </label>
          </div>
        ))}

        <Link to="/add-address" className="btn btn-outline-primary mb-3">
          + Add New Address
        </Link>

        <div className="py-5">
          <OrderSummary />
        </div>

        <div className="mb-5">
          <button
            id="placeOrderBtn"
            onClick={handlePlaceOrder}
            className="btn btn-success d-grid gap-2 col-6 mx-auto"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
