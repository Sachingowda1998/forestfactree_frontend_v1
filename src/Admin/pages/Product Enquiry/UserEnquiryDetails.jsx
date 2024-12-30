import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Paper, Container } from "@mui/material";

const rows = [
  {
    id: 1,
    name: "John Doe",
    Phone: "1234567890",
    ProductName: "Oak Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
    Action: "View Details",
    message: "Can you share more details about the Oak Timber?",
  },
  {
    id: 2,
    name: "Jane Smith",
    Phone: "9876543210",
    ProductName: "Pine Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-25",
    Action: "View Details",
    message: "Is Pine Timber suitable for outdoor use?",
  },
  {
    id: 3,
    name: "Emily Johnson",
    Phone: "5551234567",
    ProductName: "Mahogany Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-02",
    Action: "View Details",
    message: "What is the price per cubic foot for Mahogany Timber?",
  },
  {
    id: 4,
    name: "Michael Brown",
    Phone: "5559876543",
    ProductName: "Teak Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-22",
    Action: "View Details",
    message: "Can you provide samples of Teak Timber?",
  },
  {
    id: 5,
    name: "David Lee",
    Phone: "5552468101",
    ProductName: "Maple Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-03",
    Action: "View Details",
    message: "What is the delivery time for Maple Timber?",
  },
  {
    id: 6,
    name: "Sarah Davis",
    Phone: "5551357924",
    ProductName: "Cedar Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-28",
    Action: "View Details",
    message: "Can Cedar Timber be used for furniture making?",
  },
  {
    id: 7,
    name: "James Wilson",
    Phone: "5558642097",
    ProductName: "Balsa Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
    Action: "View Details",
    message: "Do you offer discounts on bulk orders of Balsa Timber?",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    Phone: "5553765289",
    ProductName: "Ash Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-29",
    Action: "View Details",
    message: "Can Ash Timber be delivered outside the city?",
  },
  {
    id: 9,
    name: "William Garcia",
    Phone: "5551472589",
    ProductName: "Redwood Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-02",
    Action: "View Details",
    message: "Is Redwood Timber treated for termite resistance?",
  },
  {
    id: 10,
    name: "Sophia Taylor",
    Phone: "5553698745",
    ProductName: "Birch Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-30",
    Action: "View Details",
    message: "Can you confirm the availability of Birch Timber?",
  },
  {
    id: 11,
    name: "Daniel Harris",
    Phone: "5552589634",
    ProductName: "Spruce Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-04",
    Action: "View Details",
    message: "What are the specifications of Spruce Timber?",
  },
  {
    id: 12,
    name: "Isabella Clark",
    Phone: "5554785210",
    ProductName: "Cherry Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-27",
    Action: "View Details",
    message: "Is Cherry Timber available in custom sizes?",
  },
  {
    id: 13,
    name: "Benjamin Lewis",
    Phone: "5551597534",
    ProductName: "Walnut Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-03",
    Action: "View Details",
    message: "Can I get a quote for Walnut Timber?",
  },
  {
    id: 14,
    name: "Charlotte Walker",
    Phone: "5557531592",
    ProductName: "Fir Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-23",
    Action: "View Details",
    message: "Is Fir Timber available for immediate shipment?",
  },
  {
    id: 15,
    name: "Elijah Allen",
    Phone: "5553216549",
    ProductName: "Douglas Fir Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
    Action: "View Details",
    message: "What is the durability of Douglas Fir Timber?",
  },
];

function UserEnquiryDetails() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urid = parseInt(query.get("urid"), 10);

  const enquiryDetails = rows.find((row) => row.id === urid);

  if (!enquiryDetails) {
    return (
      <Container maxWidth="md">
        <Typography variant="h6">No details found for this enquiry.</Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" style={{ marginTop: "16px" }}>
      <h2>User Enquiry Details</h2>
      <Paper style={{ padding: "16px", backgroundColor: "white" }}>
        <Typography variant="h5" gutterBottom style={{ color: "black" }}>
          Enquiry Details
        </Typography>
        <Grid container spacing={2}>
          {Object.keys(enquiryDetails).map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <Typography
                variant="subtitle2"
                style={{ color: "black", fontWeight: "bold", fontSize: "17px" }}
              >
                {field}
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                {enquiryDetails[field]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserEnquiryDetails;
