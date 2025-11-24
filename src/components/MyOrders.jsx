import useBookContext from "../contexts/BookContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { userId, allBooks } = useBookContext();

  const { data, loading, error } = useFetch(
    `https://booknest-backend-webapp.vercel.app/profile/${userId}`
  );

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  if (!data || !data.orders) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="container my-5">
      <h2>📦 My Orders</h2>
      <hr />

      <Link to="/profile" className="btn btn-outline-secondary mb-3">
        ← Back to Profile
      </Link>

      {data.orders.length === 0 && <p>You haven't placed any orders yet.</p>}

      {data.orders.map((order) => (
        <div className="card my-3" key={order._id}>
          <div className="card-body">
            <h5>Order ID: {order._id}</h5>
            <p>
              <strong>Date:</strong> {new Date(order.date).toLocaleString()}
            </p>
            <p>
              <strong>Address: </strong>
              {order.address.houseNumber}, {order.address.street},{" "}
              {order.address.city}, {order.address.state} -{" "}
              {order.address.pincode}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Total Items:</strong> {order.totalItems}
            </p>

            <h6 className="mt-3">Items:</h6>

            {order.items.map((item) => {
              const book = allBooks?.find((b) => b._id === item.bookId);

              return (
                <div className="d-flex mb-3" key={item.bookId}>
                  <img
                    src={book?.imageUrl}
                    alt={book?.title}
                    width="60"
                    height="80"
                    className="me-3 rounded"
                  />

                  <div>
                    <p className="mb-1">
                      <strong>{book?.title}</strong>
                    </p>
                    <p className="mb-0">Qty: {item.quantity}</p>
                    <p className="mb-0">Price: ₹{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
