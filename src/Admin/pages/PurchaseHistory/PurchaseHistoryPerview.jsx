import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If you are using React Router
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function PurchaseHistoryPerview() {
  const { id } = useParams(); // Get ID from the URL (e.g. /purchase/:id)

  // State variables
  const [isEditable, setIsEditable] = useState(true); // Start with fields editable
  const [status, setStatus] = useState("Pending"); // Add status state

  // Example static data (you can replace this with dynamic fetching based on ID)
  const [productData, setProductData] = useState({
    productName: "Wooden Plank",
    sellerID: "12345", // Replace with actual seller ID
    date: "2024-11-20",
    category: "Wood",
    subCategory: "Planks",
    weight: "500kg",
    units: "kg",
    minStock: "10",
    treeMeasure: "5 meters",
    description: "A good quality wooden plank",
  });

  // Effect hook to fetch data based on ID (this would normally be a fetch or API call)
  useEffect(() => {
    // You can fetch the data dynamically using the ID here
    // e.g. fetchData(id);
    // For now, we'll assume static data for the preview
  }, [id]);

  // Handle status change
  const toggleStatus = () => {
    if (status !== "Confirmed") {
      const newStatus = "Confirmed"; // Automatically set to confirmed
      setStatus(newStatus);

      // If status is confirmed, set fields to non-editable
      setIsEditable(false); // Disable editing once confirmed
    }
  };

  const toggleEditMode = () => {
    if (status !== "Confirmed") {
      setIsEditable(!isEditable); // Toggle only if not confirmed
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "black" }}>PurchaseHistoryPerview</h2>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={4} controlId="sellerName">
            <Form.Label>Seller Name</Form.Label>
            <Form.Control
              type="text"
              value={productData.productName}
              onChange={(e) =>
                setProductData({ ...productData, productName: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="sellerID">
            <Form.Label>Seller ID</Form.Label>
            <Form.Control
              type="text"
              value={productData.sellerID}
              onChange={(e) =>
                setProductData({ ...productData, sellerID: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={productData.date}
              onChange={(e) =>
                setProductData({ ...productData, date: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={4} controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={productData.productName}
              onChange={(e) =>
                setProductData({ ...productData, productName: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            >
              <option>Wood</option>
              <option>Metal</option>
              <option>Plastic</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="subCategory">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select
              value={productData.subCategory}
              onChange={(e) =>
                setProductData({ ...productData, subCategory: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            >
              <option>Planks</option>
              <option>Beams</option>
              <option>Logs</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={4} controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              value={productData.weight}
              onChange={(e) =>
                setProductData({ ...productData, weight: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="units">
            <Form.Label>Units</Form.Label>
            <Form.Select
              value={productData.units}
              onChange={(e) =>
                setProductData({ ...productData, units: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            >
              <option>kg</option>
              <option>lb</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="minStock">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="number"
              value={productData.minStock}
              onChange={(e) =>
                setProductData({ ...productData, minStock: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>
        </Row>

        {/* Status Section */}
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={4} controlId="status">
            <Form.Label>Status</Form.Label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: status === "Pending" ? "#f8d7da" : "#d4edda",
                color: status === "Pending" ? "#721c24" : "#155724",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {status}
            </div>
            <Button
              variant="outline-info"
              style={{ marginTop: "10px" }}
              onClick={toggleStatus}
              disabled={status === "Confirmed"} // Disable button once status is confirmed
            >
              Toggle Status
            </Button>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={!isEditable}>
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={toggleEditMode}
          style={{ marginLeft: "10px" }}
          disabled={status === "Confirmed"} // Disable edit button once status is confirmed
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </Form>
    </div>
  );
}

export default PurchaseHistoryPerview;
