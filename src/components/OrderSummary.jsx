import { use } from "react";
import useBookContext from "../contexts/BookContext";

const OrderSummary = () => {

const {cart} = useBookContext()
const totalAmount = cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
const deliveryCharges = totalAmount >= 1200 ? 0 : 50

  return (
    <div>
      <div className="card ">
        <div className="card-body">
          <h4 className="text-center">Order Summary</h4>
          <hr />
          <p className="fs-5 fw-semibold">
            Total Items: {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
          </p>
          <p className="fs-5 fw-semibold">Price: ₹{totalAmount}</p>
          <p className="fs-5 fw-semibold">
            Delivery Charges:{" "}
            {deliveryCharges != 0 ? "₹" + deliveryCharges : "Free"}
          </p>

          <hr />
          <p className="fs-5 fw-semibold">
            Total Amount: ₹{totalAmount + deliveryCharges}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
