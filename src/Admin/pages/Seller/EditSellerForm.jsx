// Required dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditSellerForm = () => {
  const { id } = useParams(); // Get seller ID from URL params
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    farmAddress: "",
    gstNumber: "",
    panNumber: "",
    additionalDetails: "",
    active: "yes",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch seller details on component mount
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/sellers/all`);
        const data = await response.json();
        const seller = data.find((s) => s._id === id);
        if (seller) {
          setSellerData(seller);
        } else {
          Swal.fire("Error", "Seller not found", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch seller details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData({ ...sellerData, [name]: value });
  };

  // Handle form submission to update seller
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forestfactree/sellers/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sellerData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", result.message, "success");
        navigate("/admin/sellerlist");
      } else if (result.errors) {
        // If specific field errors are returned, display them
        const errorMessages = Object.entries(result.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join("\n");
        Swal.fire("Validation Errors", errorMessages, "error");
      } else {
        Swal.fire("Error", result.message || "Failed to update seller", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update seller", "error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container text-dark mt-5">
      <h2>Edit Seller Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={sellerData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={sellerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              value={sellerData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alternateMobileNumber" className="form-label">
              Alternate Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="alternateMobileNumber"
              name="alternateMobileNumber"
              value={sellerData.alternateMobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="farmAddress" className="form-label">
              Farm Address
            </label>
            <textarea
              className="form-control"
              id="farmAddress"
              name="farmAddress"
              value={sellerData.farmAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="gstNumber" className="form-label">
              GST Number
            </label>
            <input
              type="text"
              className="form-control"
              id="gstNumber"
              name="gstNumber"
              value={sellerData.gstNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="panNumber" className="form-label">
              PAN Number
            </label>
            <input
              type="text"
              className="form-control"
              id="panNumber"
              name="panNumber"
              value={sellerData.panNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="additionalDetails" className="form-label">
              Additional Details
            </label>
            <textarea
              className="form-control"
              id="additionalDetails"
              name="additionalDetails"
              value={sellerData.additionalDetails}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="active" className="form-label">
              Active Status
            </label>
            <select
              className="form-select"
              id="active"
              name="active"
              value={sellerData.active}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Update Seller
          </button>
        </form>
      )}
    </div>
  );
};

export default EditSellerForm;
