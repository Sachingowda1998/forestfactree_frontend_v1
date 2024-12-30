import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSellerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    farmAddress: "",
    gstNumber: "",
    panNumber: "",
    additionalDetails: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/sellers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        });
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          alternateMobileNumber: "",
          farmAddress: "",
          gstNumber: "",
          panNumber: "",
          additionalDetails: "",
        }); // Reset the form
        navigate("/sellerlist")
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Something went wrong.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit the form. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-5 text-dark">
      <h2 className="mb-4 text-center">Add Seller</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            className="form-control"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="alternateMobileNumber" className="form-label">Alternate Mobile Number</label>
          <input
            type="text"
            id="alternateMobileNumber"
            name="alternateMobileNumber"
            className="form-control"
            value={formData.alternateMobileNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="farmAddress" className="form-label">Farm Address</label>
          <input
            type="text"
            id="farmAddress"
            name="farmAddress"
            className="form-control"
            value={formData.farmAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gstNumber" className="form-label">GST Number</label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            className="form-control"
            value={formData.gstNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="panNumber" className="form-label">PAN Number</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            className="form-control"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="additionalDetails" className="form-label">Additional Details</label>
          <input
            type="text"
            id="additionalDetails"
            name="additionalDetails"
            className="form-control"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddSellerForm;
