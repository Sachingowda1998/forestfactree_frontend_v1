import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddCategory() {
  const [name, setName] = useState("");
  const [cdescp, setCdescp] = useState("");
  const [cimage, setCimage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cdescp", cdescp);
    formData.append("cimage", cimage);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories/add`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Category added successfully",
          icon: "success",
        });
        navigate("/admin/category"); // Redirect after successful addition
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container text-dark">
      <h2 className="text-center mt-3 mb-3">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cdescp">Category Description</label>
          <textarea
            className="form-control"
            id="cdescp"
            rows="3"
            value={cdescp}
            onChange={(e) => setCdescp(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cimage">Category Image</label>
          <input
            type="file"
            className="form-control"
            id="cimage"
            onChange={(e) => setCimage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
