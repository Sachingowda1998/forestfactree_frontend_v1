import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function UserEnquiryPending() {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div className="container">
      <h2 style={{ color: "black" }}>Admin Product Purchase </h2>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="">
            <Form.Label>Seller Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Seller name"
              style={{ height: "40px" }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="seller Id">
            <Form.Label>Seller Id</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Number"
              style={{ height: "40px" }}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        {/* pod */}
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={4} controlId="formGridCity">
            <Form.Label>Product Name</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} xs={12} md={4} controlId="formGridState">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Weigth</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Units</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="">
            <Form.Label>Price</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        {/*  */}

        <Row className="mb-3">
          <Form.Group as={Col} xl={3} controlId="">
            <Form.Label>Quantity</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} xl={3} controlId="formGridCity">
            <Form.Label>Date</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Additional Points</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
          />
        </Form.Group>
        {/* weight ,unit */}

        {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserEnquiryPending;
