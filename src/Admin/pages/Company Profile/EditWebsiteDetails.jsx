import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditWebsiteDetails = () => {
  const [details, setDetails] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    mailingAddress: "",
    aboutUsImage: null,
    contactUsImage: null,
    aboutUsHeading: "",
    aboutUsDescriptionPart1: "",
    aboutUsDescriptionPart2: "",
    aboutUsDescriptionPart3: "",
    aboutUsDescriptionPart4: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the website details from the backend
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/website-details/all`);
        const data = await response.json();
        if (data.websiteDetails.length > 0) {
          setDetails(data.websiteDetails[0]);
          setFormData({
            email: data.websiteDetails[0].email,
            mobileNumber: data.websiteDetails[0].mobileNumber,
            alternateMobileNumber: data.websiteDetails[0].alternateMobileNumber,
            mailingAddress: data.websiteDetails[0].mailingAddress,
            aboutUsHeading: data.websiteDetails[0].aboutUsHeading,
            aboutUsDescriptionPart1: data.websiteDetails[0].aboutUsDescriptionPart1,
            aboutUsDescriptionPart2: data.websiteDetails[0].aboutUsDescriptionPart2,
            aboutUsDescriptionPart3: data.websiteDetails[0].aboutUsDescriptionPart3,
            aboutUsDescriptionPart4: data.websiteDetails[0].aboutUsDescriptionPart4,
          });
        } else {
          Swal.fire("Error", "No website details found to edit", "error");
          navigate("/admin/companyprofile");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch website details", "error");
      }
    };

    fetchDetails();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = details._id;
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/website-details/edit/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", result.message, "success");
        navigate("/admin/companyprofile");
      } else {
        Swal.fire("Error", result.message || "Failed to update details", "error");
        if (result.errors) setErrors(result.errors);
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  if (!details) return <p>Loading...</p>;

  return (
    <div className="container text-dark mt-5 mb-5">
      <h2 className="text-center">Edit Website Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Please provide a valid email.</div>
        </div>

        <div className="form-group mb-3">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            className="form-control"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            required
          />
          <div className="invalid-feedback">Please provide a valid 10-digit mobile number.</div>
        </div>

        <div className="form-group mb-3">
          <label>Alternate Mobile Number</label>
          <input
            type="tel"
            name="alternateMobileNumber"
            className="form-control"
            value={formData.alternateMobileNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Mailing Address</label>
          <textarea
            name="mailingAddress"
            className="form-control"
            value={formData.mailingAddress}
            onChange={handleInputChange}
            required
          ></textarea>
          <div className="invalid-feedback">Mailing address is required.</div>
        </div>

        <div className="form-group mb-3">
          <label>About Us Image</label>
          <input
            type="file"
            name="aboutUsImage"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Contact Us Image</label>
          <input
            type="file"
            name="contactUsImage"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>About Us Heading</label>
          <input
            type="text"
            name="aboutUsHeading"
            className="form-control"
            value={formData.aboutUsHeading}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">Please provide a heading for About Us.</div>
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div className="form-group mb-3" key={index}>
            <label>{`About Us Description Part ${index + 1}`}</label>
            <textarea
              name={`aboutUsDescriptionPart${index + 1}`}
              className="form-control"
              value={formData[`aboutUsDescriptionPart${index + 1}`]}
              onChange={handleInputChange}
            ></textarea>
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default EditWebsiteDetails;
