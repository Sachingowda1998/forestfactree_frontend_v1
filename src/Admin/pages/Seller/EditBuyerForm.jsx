import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditBuyerForm = () => {
  const { id } = useParams(); // Get buyerId from URL

  console.log(id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    buyerType: '',
    millAddress: '',
    gstNumber: '',
    panNumber: '',
    additionalDetails: '',
  });

  // Fetch the buyer details when the component mounts
  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyers/buyer/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            mobileNumber: data.mobileNumber || '',
            alternateMobileNumber: data.alternateMobileNumber || '',
            buyerType: data.buyerType || '',
            millAddress: data.millAddress || '',
            gstNumber: data.gstNumber || '',
            panNumber: data.panNumber || '',
            additionalDetails: data.additionalDetails || '',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.message || 'Failed to fetch buyer details.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to connect to the server. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchBuyerDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyers/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: responseData.message || 'Buyer details updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/admin/buyerlist'); // Redirect to the buyers list after success
      } else {
        Swal.fire({
          title: 'Error!',
          text: responseData.message || 'Something went wrong, please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center text-dark'>Edit Buyer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            pattern="^\d{10}$"
            title="Mobile number should be 10 digits"
          />
        </div>
        <div className="form-group">
          <label>Alternate Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="alternateMobileNumber"
            value={formData.alternateMobileNumber}
            onChange={handleChange}
            pattern="^\d{10}$"
            title="Alternate mobile number should be 10 digits"
          />
        </div>
        <div className="form-group">
          <label>Buyer Type</label>
          <select
            className="form-select"
            name="buyerType"
            value={formData.buyerType}
            onChange={handleChange}
            required
          >
            <option value="">Select Buyer Type</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mill Address</label>
          <input
            type="text"
            className="form-control"
            name="millAddress"
            value={formData.millAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>GST Number</label>
          <input
            type="text"
            className="form-control"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            pattern="^\d{15}$"
            title="Please enter a valid GST number"
          />
        </div>
        <div className="form-group">
          <label>PAN Number</label>
          <input
            type="text"
            className="form-control"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Additional Details</label>
          <textarea
            className="form-control"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Buyer
        </button>
      </form>
    </div>
  );
};

export default EditBuyerForm;
