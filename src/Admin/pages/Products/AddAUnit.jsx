import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddUnit = () => {
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/units`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unit }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", result.message, "success");
        setUnit("");
        navigate("/admin/units");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add unit. Please try again.", "error");
    }
  };

  return (
    <div className="container text-dark mt-3">
      <h2 className="text-center mb-3">Add Unit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="unit" className="form-label">
            Unit
          </label>
          <input
            type="text"
            id="unit"
            className="form-control"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Unit
        </button>
      </form>
    </div>
  );
};

export default AddUnit;
