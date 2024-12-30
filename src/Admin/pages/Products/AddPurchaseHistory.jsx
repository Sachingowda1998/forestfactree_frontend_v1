import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PurchaseHistoryForm = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    productName: "",
    category: "",
    subcategory: "",
    quantity: "",
    price: "",
    units: "",
  });

  const [categories, setCategories] = useState([]); // For categories dropdown
  const [subcategories, setSubcategories] = useState([]); // For subcategories dropdown
  const [units, setUnits] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories`);
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error fetching categories",
            text: data.message || "Failed to load categories",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch categories. Please try again later.",
        });
      }
    };

    fetchCategories();
  }, []);

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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    // Update subcategories based on the selected category
    const category = categories.find((cat) => cat.name === selectedCategory);

    console.log("Selected Category:", category);
    console.log("Subcategories:", category ? category.subcategories : "No subcategories");

    setSubcategories(category ? category.subcategories : []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forestfactree/purchase-history/add`,
        {
          method: "POST",
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
          text: `Purchase: ${data.purchase.productName} added successfully.`,
        });

        setFormData({
          sellerName: "",
          productName: "",
          category: "",
          subcategory: "",
          quantity: "",
          price: "",
          units: "",
        });
        navigate("/admin/purchasehistory");
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
      <h2 className="text-center mb-4">Add Purchase History</h2>
      <form onSubmit={handleSubmit} className="col-md-12">
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
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategory</label>
          <select
  className="form-select"
  name="subcategory"
  value={formData.subcategory}
  onChange={handleChange}
  required
>
  <option value="">Select Subcategory</option>
  {subcategories.length > 0 ? (
    subcategories.map((subcategory) => (
      <option key={subcategory._id} value={subcategory.sname}>
        {subcategory.sname}
      </option>
    ))
  ) : (
    <option disabled>No Subcategories Available</option>
  )}
</select>

        </div>
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
        <div className="mb-3">
  <label className="form-label">Units</label>
  <select
    className="form-select"
    name="units"
    value={formData.units}
    onChange={handleChange}
    required
  >
    <option value="">Select Unit</option>
    {units.map((unit) => (
      <option key={unit._id} value={unit.unit}>
        {unit.unit}
      </option>
    ))}
  </select>
</div>

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
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Add Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseHistoryForm;
