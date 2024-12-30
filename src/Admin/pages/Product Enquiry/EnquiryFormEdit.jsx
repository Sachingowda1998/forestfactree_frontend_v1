import React, { useState } from "react";
import {
  Button,
  Form,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const EnquiryFormEdit = () => {
  const [enquiryStatus, setEnquiryStatus] = useState("Pending");

  const handleStatusChange = (value) => {
    setEnquiryStatus(value);
  };

  return (
    <div className="container mt-5">
      <h1 style={{ color: "black" }}>Enquiry Form Edit</h1>
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formID">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter ID" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formEnquiryReqDate">
              <Form.Label>Enquiry Request Date</Form.Label>
              <Form.Control type="date" style={{ height: "50px" }} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Product Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Product Category" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formProductSubCategory">
              <Form.Label>Product Sub-Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Sub-Category"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Product Name" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formBuyerName">
              <Form.Label>Buyer's Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Buyer's Name" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formBuyerPhone">
              <Form.Label>Buyer's Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter Buyer's Phone" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formBuyerEmail">
              <Form.Label>Buyer's Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Buyer's Email" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Form.Group controlId="formBuyerAddress">
              <Form.Label>Buyer's Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Buyer's Address"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Form.Group controlId="formBuyerMessage">
              <Form.Label>Buyer Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Buyer's Message"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Form.Group controlId="formEnquiryStatus">
              <Form.Label>Enquiry Status</Form.Label>
              <ToggleButtonGroup
                type="radio"
                name="enquiryStatus"
                value={enquiryStatus}
                onChange={handleStatusChange}
              >
                <ToggleButton
                  id="tbg-radio-1"
                  value="Pending"
                  variant="outline-primary"
                >
                  Pending
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-2"
                  value="Responded"
                  variant="outline-success"
                >
                  Responded
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EnquiryFormEdit;
