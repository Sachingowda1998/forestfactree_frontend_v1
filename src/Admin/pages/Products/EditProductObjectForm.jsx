import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditProductForm() {
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [editorData, setEditorData] = useState("Product description here");
  const [files, setFiles] = useState(Array(5).fill("/assets/wood3.jpg"));

  // Predefined product data (this can be fetched from a database or passed as props)
  const [productData, setProductData] = useState({
    productName: "Wooden Plank",
    category: "Wood",
    subCategory: "Planks",
    weight: "500kg",
    units: "kg",
    minStock: "10",
    treeMeasure: "5 meters",
    date: "2024-11-20",
    description: "A good quality wooden plank",
  });

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleChange = (index) => (e) => {
    const updatedFiles = [...files];
    updatedFiles[index] = URL.createObjectURL(e.target.files[0]);
    setFiles(updatedFiles);
  };

  const imageStyle = {
    width: "100%",
    height: "130px",
    objectFit: "cover",
    marginTop: "10px",
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="container">
      <h2 style={{ color: "black" }}>Edit Product</h2>
      <Form>
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
            <Form.Label>Minimum Stock</Form.Label>
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

        <Row className="mb-3">
          <Form.Group as={Col} xl={3} controlId="treeMeasure">
            <Form.Label>Tree Measure (if available)</Form.Label>
            <Form.Control
              type="text"
              value={productData.treeMeasure}
              onChange={(e) =>
                setProductData({ ...productData, treeMeasure: e.target.value })
              }
              disabled={!isEditable}
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} xl={3} controlId="date">
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

        <div>
          <h2 style={{ color: "black" }}>Product Images</h2>
          <Row>
            {files.map((file, index) => (
              <Col key={index} lg={4} md={4} sm={12}>
                <h4 style={{ color: "black" }}>Image {index + 1}</h4>
                <Form.Group>
                  <Form.Control
                    type="file"
                    onChange={handleChange(index)}
                    disabled={!isEditable}
                    name={`image${index + 1}`}
                    style={{ height: "40px" }}
                  />
                  <img src={file} alt="not found" style={imageStyle} />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            disabled={!isEditable}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isEditable}>
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={toggleEditMode}
          style={{ marginLeft: "10px" }}
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>
      </Form>
    </div>
  );
}

export default EditProductForm;
