import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    productName: "",
    shortDescription: "",
    longDescription: "",
    images: { thumbnail: null, image2: null, image3: null, image4: null },
    weight: "",
    units: "",
    treeMeasure: "",
    category: "",
    subcategory: "",
  });

  const [message, setMessage] = useState(null);

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      images: {
        ...prevData.images,
        [key]: file,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    for (const key in formData) {
      if (key === "images") {
        Object.keys(formData.images).forEach((imageKey) => {
          uploadData.append("images", formData.images[imageKey]);
        });
      } else {
        uploadData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/add`, {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        Swal.fire({
          icon: "success",
          title: "Product Added",
          text: "Product Added Successfully.",
        });
        setFormData({
          productName: "",
          shortDescription: "",
          longDescription: "",
          images: { thumbnail: null, image2: null, image3: null, image4: null },
          weight: "",
          units: "",
          treeMeasure: "",
          category: "",
          subcategory: "",
        });
        navigate("/admin/productobjects");
      } else {
        setMessage({ type: "danger", text: data.message || "Failed to upload product." });
      }
    } catch (error) {
      setMessage({ type: "danger", text: `Error: ${error.message}` });
    }
  };

  return (
    <div className="container text-dark mt-5">
      <h1 className="text-center">Upload New Product</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
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
          <label className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            maxLength="25"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <textarea
            className="form-control"
            name="longDescription"
            rows="3"
            value={formData.longDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Thumbnail Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "thumbnail")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image 2</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image2")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image 3</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image3")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image 4</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image4")}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Weight</label>
          <input
            type="number"
            className="form-control"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Units</label>
          <input
            type="text"
            className="form-control"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </div> */}
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
          <label className="form-label">Tree Measure</label>
          <input
            type="text"
            className="form-control"
            name="treeMeasure"
            value={formData.treeMeasure}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategory</label>
          <input
            type="text"
            className="form-control"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div> */}
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
        <button type="submit" className="btn btn-primary">Upload Product</button>
      </form>
      {message && (
        <div className={`alert alert-${message.type} mt-3`} role="alert">
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
