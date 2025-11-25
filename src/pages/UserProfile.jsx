import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import useBookContext from "../contexts/BookContext";

const UserProfile = () => {
  const { userId } = useBookContext();
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `https://booknest-backend-webapp.vercel.app/profile/${userId}`
  );

  useEffect(() => {
    async function fetchAddresses() {
      if (!userId) return;

      try {
        const res = await fetch(
          `https://booknest-backend-webapp.vercel.app/address/${userId}`
        );
        const data = await res.json();
        setAddresses(data);
      } catch (error) {
        console.log("Address fetch error:", error);
      }
    }

    fetchAddresses();
  }, [userId, setAddresses, data]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center mt-5">No User Found</p>;
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
    <div className="container my-5">
      <h2>User Profile</h2>
      <hr />

      <p>
        <strong>Name: </strong>
        {data.name}
      </p>
      <p>
        <strong>Email: </strong>
        {data.email}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {data.phoneNumber}
      </p>

      <h5>Addresses: ({addresses.length})</h5>
      <div>
        {addresses.length === 0 && (
          <div className="alert alert-warning mt-3">
            No addresses saved. Please add an address.
          </div>
        )}

        {addresses.map((addr) => (
          <div className="card my-3" key={addr._id}>
            <div className="card-body d-flex justify-content-between align-items-start">
              <div>
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
          </div>
        ))}

        <Link to="/add-address" className="btn btn-outline-primary mb-3">
          + Add New Address
        </Link>
      </div>

      <Link to="/orders" className="btn btn-outline-primary my-3">
        📦 My Orders
      </Link>
    </div>
  );
};

export default UserProfile;
