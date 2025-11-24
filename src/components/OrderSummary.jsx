import useBookContext from "../contexts/BookContext";

const OrderSummary = () => {
  const {
    totalMrp,
    total,
    totalItems,
    deliveryCharges,
    totalAmount,
    discount,
  } = useBookContext();

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4 className="text-center">Order Summary</h4>
          <hr />
          <p className="fs-5 fw-semibold d-flex justify-content-between">
            Total Items: <span>{totalItems}</span>
          </p>
          <p className="fs-5 fw-semibold d-flex justify-content-between">
            Total Cart:{" "}
            <span className="text-decoration-line-through">₹{totalMrp}</span>
          </p>
          <p className="fs-5 fw-semibold d-flex justify-content-between ">
            Discount: <span className="text-success">-₹{discount}</span>
          </p>
          <p className="fs-5 fw-semibold d-flex justify-content-between">
            Total Price: <span>₹{total}</span>
          </p>
          <p className="fs-5 fw-semibold d-flex justify-content-between">
            Delivery Charges:{" "}
            <span>{deliveryCharges != 0 ? "₹" + deliveryCharges : "Free"}</span>
          </p>

          <hr />
          <p className="fs-5 fw-bold d-flex justify-content-between">
            Total Amount: <span>₹{totalAmount.toFixed(2)}</span>
          </p>
          <hr />
          <h6 className="text-center text-success">
            You'll save <strong>₹{discount}</strong> on this order!
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
