import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cdescp, setCdescp] = useState("");
  const [cimage, setCimage] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories/${id}`);
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setCdescp(data.cdescp);
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Failed to fetch category",
          icon: "error",
        });
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("cdescp", cdescp);
    if (cimage) formData.append("cimage", cimage);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories/edit/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully",
          icon: "success",
        });
        navigate("/admin/category"); // Redirect after successful update
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
      <h2 className="text-center mt-3 mb-3">Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
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
        <div className="form-group mb-4">
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
        <div className="form-group mb-4">
          <label htmlFor="cimage">Category Image (Optional)</label>
          <input
            type="file"
            className="form-control"
            id="cimage"
            onChange={(e) => setCimage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Category
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
