import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditPurchaseHistory = ({ match }) => {
  const [formData, setFormData] = useState({
    sellerName: "",
    productName: "",
    category: "",
    subcategory: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    const { id } = match.params;  // Extract purchaseId from URL params
    // Fetch the data of the purchase based on the ID
    fetch(`http://localhost:5000/forestfactree/purchase-history/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.purchase) {
          setFormData({
            sellerName: data.purchase.sellerName,
            productName: data.purchase.productName,
            category: data.purchase.category,
            subcategory: data.purchase.subcategory,
            quantity: data.purchase.quantity,
            price: data.purchase.price,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching data.",
        });
      });
  }, [match.params]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = match.params;
    try {
      const response = await fetch(
        `http://localhost:5000/forestfactree/purchase-history/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: data.message,
          text: `Purchase: ${data.purchase.productName} updated successfully.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data.message || "Something went wrong",
          text: data.errors ? data.errors.join(", ") : "Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container text-dark mt-5 mb-5">
      <h2 className="text-center mb-4">Edit Purchase History</h2>
      <form onSubmit={handleSubmit} className="col-md-12">
        {/* Seller Name */}
        <div className="mb-3">
          <label className="form-label">Seller Name</label>
          <input
            type="text"
            className="form-control"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label className="form-label">Subcategory</label>
          <input
            type="text"
            className="form-control"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Update Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPurchaseHistory;
