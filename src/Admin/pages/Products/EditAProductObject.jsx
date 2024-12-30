import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    shortDescription: "",
    longDescription: "",
    images: ["","","",""], 
    weight: "",
    units: "",
    treeMeasure: "",
    category: "",
    subcategory: "",
  });

    const [units, setUnits] = useState([]);

  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          const { images, ...rest } = data.product;
          setFormData({
            ...rest,
            images: images.concat(Array(4 - images.length).fill("")), // Ensure exactly 4 placeholders
          });
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch product details", "error");
      }
    };
    fetchProductDetails();
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle individual image input changes
  const handleImageChange = (index, file) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.some((img) => !img)) {
      Swal.fire("Error", "Please upload exactly four images.", "error");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/edit/${id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Product updated successfully.", "success");
        navigate("/admin/productobjects");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update product.", "error");
    }
  };

  return (
    <div className="container text-dark mt-5 mb-5">
      <h2 className="text-center">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="form-control"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shortDescription" className="form-label">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            className="form-control"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            maxLength="25"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="longDescription" className="form-label">
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            className="form-control"
            rows="3"
            value={formData.longDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Thumbnail Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleImageChange(0, e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image 2</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleImageChange(1, e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image 3</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleImageChange(2, e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image 4</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleImageChange(3, e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="form-control"
            value={formData.weight}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
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

        {/* <div className="mb-3">
          <label htmlFor="units" className="form-label">
            Units
          </label>
          <input
            type="text"
            id="units"
            name="units"
            className="form-control"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            className="form-control"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div> */}

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
