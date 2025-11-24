import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import useBookContext from "../contexts/BookContext";
const UserProfile = () => {
  const { userId } = useBookContext();

  const { data, loading, error } = useFetch(
    `https://booknest-backend-webapp.vercel.app/profile/${userId}`
  );

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

      <h5>Addresses: ({data.addresses.length})</h5>
      <ul className="list-group my-3" >
        {data.addresses?.map((addr, index) => (
          <li key={index} className="list-group-item" >
            {addr.houseNumber}, {addr.street}, {addr.city},{" "}
            {addr.state}, {addr.country} - {addr.pincode} 
          </li>
        ))}
      </ul>

      <Link to="/orders" className="btn btn-outline-primary my-3">
        📦 My Orders
      </Link>
    </div>
  );
};

export default UserProfile;
