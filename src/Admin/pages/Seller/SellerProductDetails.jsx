import React, { useState } from "react";

const SellerProductDetails = () => {
  // Dummy data for a seller's products
  const seller = {
    id: 1,
    name: "John Doe",
    contact: "123-456-7890",
    slNo: "S001",
    date: "2024-11-19",
    products: [
      {
        id: 101,
        image: "https://via.placeholder.com/300/FF5733/FFFFFF",
        price: "$50",
        weight: "1kg",
        description: "Fresh apples",
      },
      {
        id: 102,
        image: "https://via.placeholder.com/300/33FF57/FFFFFF",
        price: "$70",
        weight: "1.5kg",
        description: "Organic bananas",
      },
      {
        id: 103,
        image: "https://via.placeholder.com/300/3357FF/FFFFFF",
        price: "$30",
        weight: "500g",
        description: "Premium grapes",
      },
      {
        id: 104,
        image: "https://via.placeholder.com/300/FF33A1/FFFFFF",
        price: "$40",
        weight: "700g",
        description: "Tropical mangoes",
      },
      {
        id: 105,
        image: "https://via.placeholder.com/300/FFC300/FFFFFF",
        price: "$60",
        weight: "1.2kg",
        description: "Juicy oranges",
      },
    ],
  };

  // State for managing product editing
  const [selectedProduct, setSelectedProduct] = useState(seller.products[0]); // Default to the first product
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...selectedProduct });

  // Handle edit and save actions
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setSelectedProduct({ ...editedProduct }); // Save the updated product
  };

  const handleDelete = () => {
    alert(`Product "${selectedProduct.description}" has been deleted.`);
    // Add delete logic here (e.g., API call)
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Details</h2>

      <div className="card shadow-sm p-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={selectedProduct.image}
              alt="Product"
              className="img-fluid rounded"
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
          </div>
          <div className="col-md-6">
            {!isEditing ? (
              <>
                <h5 className="mb-3">
                  <strong>Price:</strong> {selectedProduct.price}
                </h5>
                <p className="mb-3">
                  <strong>Weight:</strong> {selectedProduct.weight}
                </p>
                <p className="mb-3">
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <button className="btn btn-primary me-2" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="form-control"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">
                    Weight
                  </label>
                  <input
                    type="text"
                    id="weight"
                    className="form-control"
                    value={editedProduct.weight}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        weight: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    value={editedProduct.description}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProduct({ ...selectedProduct }); // Revert changes
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-center mt-5">Other Products</h3>
      <div className="row mt-3">
        {seller.products
          .filter((product) => product.id !== selectedProduct.id) // Exclude the selected product
          .map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 mb-4">
              <div
                className="card shadow-sm h-100"
                onClick={() => {
                  setSelectedProduct(product);
                  setEditedProduct(product);
                  setIsEditing(false);
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.description}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Price: {product.price}</h5>
                  <p className="card-text">Weight: {product.weight}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SellerProductDetails;
