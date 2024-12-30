import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const EditPurchaseHistory = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    productName: "",
    category: "",
    subcategory: "",
    quantity: "",
    units: "",
    price: "",
  });

  const { id } = useParams();
  
    const [units, setUnits] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch purchase history by ID
    fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/purchase-history/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.purchase) {
          setFormData(data.purchase);
        } else {
          Swal.fire("Error", data.message, "error");
        }
      })
      .catch((error) => Swal.fire("Error", "Failed to fetch purchase history", "error"));
  }, [id]);

  
  
     // Fetch units from the backend
     useEffect(() => {
      const fetchUnits = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/units`);
          const data = await response.json();
  
          if (response.ok) {
            setUnits(data.units); // Ensure the response contains the "units" array
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching units:", error);
        }
      };
  
      fetchUnits();
    }, []);
  
    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/purchase-history/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Purchase updated successfully") {
          Swal.fire("Success", data.message, "success");
          navigate("/admin/purchasehistory");
        } else if (data.errors) {
          Swal.fire("Validation Errors", data.errors.join(", "), "error");
        } else {
          Swal.fire("Error", data.message, "error");
        }
      })
      .catch((error) => Swal.fire("Error", "Failed to update purchase", "error"));
  };

  return (
    <div className="container text-dark mt-3 mb-3">
      <h2 className="text-center mb-3">Edit Purchase History</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label>Seller Name</label>
          <input
            type="text"
            name="sellerName"
            className="form-control"
            value={formData.sellerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            className="form-control"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group mb-4">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label>Units</label>
          <select
            name="units"
            className="form-control"
            value={formData.units}
            onChange={handleChange}
            required
          >
            {/* Populate unit options dynamically */}
            <option value="">Select Unit</option>
    {units.map((unit) => (
      <option key={unit._id} value={unit.unit}>
        {unit.unit}
      </option>
    ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Purchase
        </button>
      </form>
    </div>
  );
};

export default EditPurchaseHistory;
