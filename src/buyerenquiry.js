import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const BuyerEnquiry = () => {
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhoneNumber: "",
    buyerAlternatePhoneNumber: "",
    buyerAddress: "",
    buyerType: "",
    enquiryDetails: ""
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyer-enquiries/add`, formData);
      if (response.status === 201) {
        swal("Request Sent", "Your request has been sent successfully. We will get back to you with an update", "success")
          .then(() => {
            window.location.href = "/home";
          });
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data.messages
        ? error.response.data.messages.join("\n")
        : "There was an error submitting your enquiry. Please try again later.";
      swal("Error", errorMessage, "error");
      console.error("There was an error submitting the enquiry:", error);
    }
  };

  return (
    <section className="buyerform pt-5 pb-5 home-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div id="cardContainer">
              <div id="initialCard" className="card shadow">
                <div className="card-header text-center form-card-header">
                  <h3>Buyer Enquiry</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <input className="form-control mb-3" placeholder="Enter your mobile number"/>
                    <button className="btn custom-btn">Generate OTP</button>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <input className="form-control-sm mb-3" placeholder="Enter OTP" />
                    <h6>
                      <button
                        className="btn custom-btn"
                        onClick={() => {
                          document.getElementById("initialCard").classList.add("d-none");
                          document.getElementById("newFormCard").classList.remove("d-none");
                        }}
                      >
                        Submit OTP
                      </button>
                    </h6>
                  </div>
                </div>
              </div>
              <div id="newFormCard" className="card shadow d-none">
                <div className="card-header text-center form-card-header">
                  <h3>Enter your details</h3>
                </div>
                <div className="card-body text-center">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter your name" name="buyerName" value={formData.buyerName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Enter your email" name="buyerEmail" value={formData.buyerEmail} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Enter your mobile number" name="buyerPhoneNumber" value={formData.buyerPhoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Enter alternate mobile number" name="buyerAlternatePhoneNumber" value={formData.buyerAlternatePhoneNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter your address" name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <select className="form-select" name="buyerType" value={formData.buyerType} onChange={handleChange} required>
                        <option value="" disabled>Select buyer type</option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="3" placeholder="Provide details about your enquiry" name="enquiryDetails" value={formData.enquiryDetails} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn custom-btn">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </section>
  );
};

export default BuyerEnquiry;
