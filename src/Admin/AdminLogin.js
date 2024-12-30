import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAdminAuth } from "../App";

const AdminLogin = () => {
    const { login } = useAdminAuth();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:5000/forestfactree/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, password }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          login(result.token); // Save token and update state
          Swal.fire("Success", result.message, "success");
          window.location.href = "/admin";
        } else {
          Swal.fire("Error", result.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to connect to the server.", "error");
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default AdminLogin;
