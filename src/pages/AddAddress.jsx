import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useBookContext from "../contexts/BookContext";

const AddAddress = () => {
  const { userId } = useBookContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState({
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    if (!editId) return;

    async function loadAddress() {
      try {
        const res = await fetch(`https://booknest-backend-webapp.vercel.app/address/${userId}`);
        const data = await res.json();

        const existing = data.find((addr) => addr._id === editId);

        if (existing) {
          setFormData(existing);
        }
      } catch (error) {
        console.log("Address load error:", error);
      }
    }

    loadAddress();
  }, [userId, editId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.pincode.length !== 6) {
      return toast.error("Pincode must be 6 digits!");
    }

    const endpoint = editId
      ? `https://booknest-backend-webapp.vercel.app/address/update/${userId}/${editId}`
      : `https://booknest-backend-webapp.vercel.app/address/${userId}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        return toast.error("Failed to save address");
      }

      toast.success(
        editId ? "✏️ Address updated!" : "✅ Address added Successfully!"
      );

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container mt-4">
      <Link className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
        ← Back
      </Link>

      <h3 className="mt-3">{editId ? "Edit Address" : "Add New Address"}</h3>

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          name="houseNumber"
          placeholder="House No."
          className="form-control mb-2"
          value={formData.houseNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          className="form-control mb-2"
          value={formData.street}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          className="form-control mb-2"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          className="form-control mb-2"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          className="form-control mb-2"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          className="form-control mb-2 bg-light"
          value={formData.country}
          readOnly
        />

        <button className="btn btn-primary w-100" type="submit">
          {editId ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
