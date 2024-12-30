import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const ContactUs = ({websitedetails}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    userType: "",
    enquiryDescription: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/contact-us/add`, formData);
      if (response.status === 201) {
        swal("Contact Details Submitted", "We will contact you shortly", "success")
          .then(() => {
            window.location.href = "/home";
          });
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data.errors
        ? error.response.data.errors.join("\n")
        : "There was an error submitting your contact details. Please try again later.";
      swal("Error", errorMessage, "error");
      console.error("There was an error submitting the contact details:", error);
    }
  };

  return (
    <section className="contactus home-bg pt-4 pb-5">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ps-4">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="p-4 pt-3">
              <div className="card shadow">
                <div className="card-header text-center form-card-header">
                  <h4> Contact Us </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Mobile" 
                        name="mobileNumber" 
                        value={formData.mobileNumber} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <select 
                        className="form-select" 
                        name="userType" 
                        value={formData.userType} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="" selected> Select User Type </option>
                        <option value="Buyer"> Buyer </option>
                        <option value="Seller"> Seller </option>
                        <option value="Other"> Other </option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <textarea 
                        className="form-control" 
                        placeholder="Enter Your Enquiry Here" 
                        name="enquiryDescription" 
                        value={formData.enquiryDescription} 
                        onChange={handleChange} 
                        required
                      />
                    </div>
                    <div className="mb-3 text-center">
                      <button type="submit" className="btn btn-lg custom-btn"> Submit </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="p-4 pt-3 h-100">
              <div className="bg-overlay p-4 rounded shadow d-flex flex-column justify-content-center align-items-start h-100">
                <h3 className="mb-4 text-white">Reach out to us</h3>
                <h6 className="mb-3 text-white">Email: {websitedetails[0]?.email} </h6>
                <h6 className="mb-3 text-white">Contact Number: +91-{websitedetails[0]?.mobileNumber}</h6>
                <h6 className="mb-3 text-white">Contact Number 2: +91-{websitedetails[0]?.alternateMobileNumber}</h6>
                <h6 className="mb-3 text-white">
                Mailing Address : {websitedetails[0]?.mailingAddress}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
