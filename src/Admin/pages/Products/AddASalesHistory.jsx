import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddSalesHistory = () => {

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [buyers, setBuyers] = useState([]); // New state to store buyer list
  let[unit, updateUnit] = useState("units");
  let[stock, updateStock] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product names from the backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/names`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching product names:", error));

        // Fetch buyer names from the backend
        fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyers/basic-info`)
        .then((response) => response.json())
        .then((data) => setBuyers(data)) // Assuming the buyer list is in data.buyers
        .catch((error) => console.error("Error fetching buyer list:", error));

  }, []);

//   const handleProductChange = (event) => {
//     setSelectedProductId(event.target.value); // Store the selected product ID
//   };






  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    weight: "",
    sellingPrice: "",
    buyerName: "",
    buyerEmail: "",
    buyerMobileNumber: "",
    buyerAddress: "",
    modeOfPayment: "",
  });

  const handleProductChange = (event) => {

    const productId = event.target.value;
    setSelectedProductId(productId);

    // Find the selected product and update the unit
    const selectedProduct = products.find((product) => product._id === productId);
    if (selectedProduct) {
      updateUnit(selectedProduct.units || "units"); // Default to "units" if no units are provided
      updateStock(selectedProduct.weight || 0);
      setFormData({
        ...formData,
        productId: productId,
        productName: selectedProduct.productName || "",
      });
    }
  };

  const handleBuyerChange = (event) => {
    const Name = event.target.value;
    setFormData({ ...formData, buyerName: Name});

    // Find the selected buyer and auto-populate email and mobile number
    const selectedBuyer = buyers.find((buyer) => buyer.name === Name);
    if (selectedBuyer) {
      setFormData({
        ...formData,
        buyerName: Name,
        buyerEmail: selectedBuyer.email || "",
        buyerMobileNumber: selectedBuyer.mobileNumber || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/sales-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Sale added successfully", "success");
        setFormData({
          productId: "",
          productName: "",
          weight: "",
          sellingPrice: "",
          buyerName: "",
          buyerEmail: "",
          buyerMobileNumber: "",
          buyerAddress: "",
          modeOfPayment: "",
        });
        navigate("/admin/SalesHistroyBillthree")
      } else {
        Swal.fire("Error", result.message || "Failed to add sale", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    }
  };

  return (
    <div className="container text-dark mt-5">
      <h2 className="text-center mb-4">Add Sale</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
        <label htmlFor="productDropdown">Select a Product:</label>
      <select className="form-select"
        id="productDropdown"
        value={selectedProductId}
        onChange={handleProductChange}
        required
      >
        <option value="" disabled>
          -- Select a Product --
        </option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.productName}
          </option>
        ))}
      </select>
        </div>

        <div className="mb-3">
          <label htmlFor="weight" className="form-label"> Enter Quantity in {unit}. Available stock is {stock} {unit} </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sellingPrice" className="form-label">Selling Price In Rupees</label>
          <input
            type="number"
            className="form-control"
            id="sellingPrice"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
        <label htmlFor="buyerName" className="form-label">
            Select Buyer:
          </label>
          <select
            className="form-select"
            id="buyerName"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleBuyerChange}
            required
          >
            <option value="" disabled>
              -- Select a Buyer --
            </option>
            {buyers.map((buyer) => (
              <option key={buyer._id} value={buyer.name}>
                {buyer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="buyerEmail" className="form-label">Buyer Email</label>
          <input
            type="email"
            className="form-control"
            id="buyerEmail"
            name="buyerEmail"
            value={formData.buyerEmail}
            onChange={handleChange}
            // pattern="^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="buyerMobileNumber" className="form-label">Buyer Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="buyerMobileNumber"
            name="buyerMobileNumber"
            value={formData.buyerMobileNumber}
            onChange={handleChange}
            required
            // pattern="^[0-9]{10}$"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="buyerAddress" className="form-label"> Buyer Address </label>
          <input
            type="text"
            className="form-control"
            id="buyerAddress"
            name="buyerAddress"
            value={formData.buyerAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="modeOfPayment" className="form-label">Mode of Payment</label>
          <select
            className="form-control"
            id="modeOfPayment"
            name="modeOfPayment"
            value={formData.modeOfPayment}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSalesHistory;
