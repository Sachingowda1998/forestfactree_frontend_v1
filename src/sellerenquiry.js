import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const SellerEnquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    alternateMobile: "",
    farmAddress: "",
    productName: "",
    weight: "",
    sellingPrice: "",
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/seller-enquiries/add`, formData);
      if (response.status === 201) {
        swal("Completed", "Product details sent successfully. Our team will contact you shortly", "success")
          .then(() => {
            window.location.href = "/";
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
                  <h3>Seller Enquiry</h3>
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
                  <h3> Enter Your Details Here </h3>
                </div>
                <div className="card-body text-center">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Enter your mobile number" name="mobile" value={formData.mobile} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Enter alternate mobile number" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter farm address" name="farmAddress" value={formData.farmAddress} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter your product name" name="productName" value={formData.productName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Enter approximate weight in tons" name="weight" value={formData.weight} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" placeholder="Enter selling price per ton" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="3" placeholder="Enter Additional Details About You Or The Product If Needed" name="enquiryDetails" value={formData.enquiryDetails} onChange={handleChange}></textarea>
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

export default SellerEnquiry;
