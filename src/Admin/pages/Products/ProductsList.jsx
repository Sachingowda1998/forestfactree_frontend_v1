import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { tokens } from "../../theme";
import { Box, useTheme, Container } from "@mui/material";
import * as XLSX from "xlsx";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "timberType", label: "Timber Type", minWidth: 120 },
  { id: "category", label: "Category", minWidth: 120 },
  { id: "subCategory", label: "Sub-Category", minWidth: 120 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "images", label: "Images", minWidth: 150, align: "center" },
  { id: "quantity", label: "Quantity", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 150, align: "right" },
];

// const timberListings = [
//   {
//     id: 1,
//     sellerName: "Suresh Timber Suppliers",
//     timberType: "Teak",
//     quantity: 120,
//     quality: "Premium",
//     pricePerUnit: 2500,
//     location: "Mumbai, Maharashtra",
//     description: "High-grade teak wood ideal for furniture and interiors.",
//     listingDate: "2024-11-13",
//     category: "Furniture",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 2,
//     sellerName: "Green Forest Co.",
//     timberType: "Sal",
//     quantity: 300,
//     quality: "Standard",
//     pricePerUnit: 1500,
//     location: "Ranchi, Jharkhand",
//     description: "Durable sal wood suitable for construction.",
//     listingDate: "2024-11-12",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: false,
//   },
//   {
//     id: 3,
//     sellerName: "Kerala Woods",
//     timberType: "Rosewood",
//     quantity: 80,
//     quality: "Luxury",
//     pricePerUnit: 5000,
//     location: "Kochi, Kerala",
//     description: "Premium rosewood for high-end furniture.",
//     listingDate: "2024-11-11",
//     category: "Luxury",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 4,
//     sellerName: "Aranya Timber Mart",
//     timberType: "Pine",
//     quantity: 200,
//     quality: "Standard",
//     pricePerUnit: 1000,
//     location: "Dehradun, Uttarakhand",
//     description: "Affordable pine wood for general use.",
//     listingDate: "2024-11-10",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
//   {
//     id: 5,
//     sellerName: "Banyan Woods",
//     timberType: "Bamboo",
//     quantity: 500,
//     quality: "Eco-Friendly",
//     pricePerUnit: 300,
//     location: "Guwahati, Assam",
//     description: "Sustainable bamboo ideal for various uses.",
//     listingDate: "2024-11-09",
//     category: "Eco-Friendly",
//     verifiedProducts: false,
//     disapprovalProducts: false,
//   },
//   {
//     id: 6,
//     sellerName: "Vinayak Timber",
//     timberType: "Neem",
//     quantity: 150,
//     quality: "Standard",
//     pricePerUnit: 700,
//     location: "Ahmedabad, Gujarat",
//     description: "Neem wood with natural insect resistance.",
//     listingDate: "2024-11-08",
//     category: "Furniture",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 7,
//     sellerName: "Mysore Timber House",
//     timberType: "Sandalwood",
//     quantity: 20,
//     quality: "Luxury",
//     pricePerUnit: 10000,
//     location: "Mysore, Karnataka",
//     description: "Exquisite sandalwood for high-value products.",
//     listingDate: "2024-11-07",
//     category: "Luxury",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 8,
//     sellerName: "Punjab Woods",
//     timberType: "Deodar",
//     quantity: 250,
//     quality: "Premium",
//     pricePerUnit: 1800,
//     location: "Shimla, Himachal Pradesh",
//     description: "High-quality deodar wood for durable construction.",
//     listingDate: "2024-11-06",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: false,
//   },
//   {
//     id: 9,
//     sellerName: "Eco Wood Mart",
//     timberType: "Bamboo",
//     quantity: 600,
//     quality: "Eco-Friendly",
//     pricePerUnit: 350,
//     location: "Patna, Bihar",
//     description: "Locally sourced bamboo, perfect for sustainable projects.",
//     listingDate: "2024-11-05",
//     category: "Eco-Friendly",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 10,
//     sellerName: "West Bengal Timbers",
//     timberType: "Sal",
//     quantity: 400,
//     quality: "Standard",
//     pricePerUnit: 1400,
//     location: "Kolkata, West Bengal",
//     description: "Sturdy sal wood for reliable construction.",
//     listingDate: "2024-11-04",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
//   {
//     id: 11,
//     sellerName: "Rajasthan Woodworks",
//     timberType: "Sheesham",
//     quantity: 90,
//     quality: "Premium",
//     pricePerUnit: 2200,
//     location: "Jaipur, Rajasthan",
//     description: "Quality sheesham wood with beautiful grain patterns.",
//     listingDate: "2024-11-03",
//     category: "Furniture",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 12,
//     sellerName: "Nagpur Timber Corp.",
//     timberType: "Teak",
//     quantity: 180,
//     quality: "Standard",
//     pricePerUnit: 2400,
//     location: "Nagpur, Maharashtra",
//     description: "Standard-grade teak wood for various applications.",
//     listingDate: "2024-11-02",
//     category: "Furniture",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
//   {
//     id: 13,
//     sellerName: "Chennai Woods",
//     timberType: "Vengai",
//     quantity: 75,
//     quality: "Luxury",
//     pricePerUnit: 4000,
//     location: "Chennai, Tamil Nadu",
//     description: "Vengai wood, perfect for robust, high-end structures.",
//     listingDate: "2024-11-01",
//     category: "Luxury",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 14,
//     sellerName: "Odisha Timber Mart",
//     timberType: "Neem",
//     quantity: 120,
//     quality: "Standard",
//     pricePerUnit: 750,
//     location: "Bhubaneswar, Odisha",
//     description: "Locally sourced neem wood with natural properties.",
//     listingDate: "2024-10-31",
//     category: "Furniture",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
//   {
//     id: 15,
//     sellerName: "Goa Timber Traders",
//     timberType: "Mango",
//     quantity: 200,
//     quality: "Standard",
//     pricePerUnit: 800,
//     location: "Panaji, Goa",
//     description: "Affordable mango wood for light construction and furniture.",
//     listingDate: "2024-10-30",
//     category: "Construction",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 16,
//     sellerName: "Haryana Timber Suppliers",
//     timberType: "Teak",
//     quantity: 100,
//     quality: "Premium",
//     pricePerUnit: 2600,
//     location: "Gurgaon, Haryana",
//     description: "Premium teak ideal for elegant interiors.",
//     listingDate: "2024-10-29",
//     category: "Furniture",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 17,
//     sellerName: "Andhra Woods",
//     timberType: "Red Sanders",
//     quantity: 60,
//     quality: "Luxury",
//     pricePerUnit: 5500,
//     location: "Vijayawada, Andhra Pradesh",
//     description: "Rare red sanders wood for high-end projects.",
//     listingDate: "2024-10-28",
//     category: "Luxury",
//     verifiedProducts: false,
//     disapprovalProducts: false,
//   },
//   {
//     id: 18,
//     sellerName: "Tamil Nadu Timber",
//     timberType: "Bamboo",
//     quantity: 450,
//     quality: "Eco-Friendly",
//     pricePerUnit: 320,
//     location: "Madurai, Tamil Nadu",
//     description: "Affordable bamboo for sustainable construction.",
//     listingDate: "2024-10-27",
//     category: "Eco-Friendly",
//     verifiedProducts: true,
//     disapprovalProducts: false,
//   },
//   {
//     id: 19,
//     sellerName: "Himalayan Timber Hub",
//     timberType: "Pine",
//     quantity: 220,
//     quality: "Standard",
//     pricePerUnit: 900,
//     location: "Manali, Himachal Pradesh",
//     description: "Sturdy pine wood for reliable construction purposes.",
//     listingDate: "2024-10-26",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
//   {
//     id: 20,
//     sellerName: "Saurashtra Woods",
//     timberType: "Acacia",
//     quantity: 140,
//     quality: "Standard",
//     pricePerUnit: 1200,
//     location: "Rajkot, Gujarat",
//     description: "Sturdy pine wood for reliable construction purposes.",
//     listingDate: "2024-10-26",
//     category: "Construction",
//     verifiedProducts: false,
//     disapprovalProducts: true,
//   },
// ];

const timberListings = [
  {
    id: 1,
    sellerName: "Suresh Timber Suppliers",
    timberType: "Teak",
    category: "Furniture",
    subCategory: "Wood for Interiors",
    description: "High-grade teak wood ideal for furniture and interiors.",
    listingDate: "2024-11-13",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 2,
    sellerName: "Green Forest Co.",
    timberType: "Sal",
    category: "Construction",
    subCategory: "Wood for Building",
    description: "Durable sal wood suitable for construction.",
    listingDate: "2024-11-12",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 3,
    sellerName: "Kerala Woods",
    timberType: "Rosewood",
    category: "Luxury",
    subCategory: "High-End Wood",
    description: "Premium rosewood for high-end furniture.",
    listingDate: "2024-11-11",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 4,
    sellerName: "Aranya Timber Mart",
    timberType: "Pine",
    category: "Construction",
    subCategory: "General Use Wood",
    description: "Affordable pine wood for general use.",
    listingDate: "2024-11-10",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 5,
    sellerName: "Banyan Woods",
    timberType: "Bamboo",
    category: "Eco-Friendly",
    subCategory: "Sustainable Material",
    description: "Sustainable bamboo ideal for various uses.",
    listingDate: "2024-11-09",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 6,
    sellerName: "Vinayak Timber",
    timberType: "Neem",
    category: "Furniture",
    subCategory: "Insect-Resistant Wood",
    description: "Neem wood with natural insect resistance.",
    listingDate: "2024-11-08",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 7,
    sellerName: "Mysore Timber House",
    timberType: "Sandalwood",
    category: "Luxury",
    subCategory: "Rare Woods",
    description: "Exquisite sandalwood for high-value products.",
    listingDate: "2024-11-07",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 8,
    sellerName: "Punjab Woods",
    timberType: "Deodar",
    category: "Construction",
    subCategory: "Durable Woods",
    description: "High-quality deodar wood for durable construction.",
    listingDate: "2024-11-06",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 9,
    sellerName: "Eco Wood Mart",
    timberType: "Bamboo",
    category: "Eco-Friendly",
    subCategory: "Sustainable Material",
    description: "Locally sourced bamboo, perfect for sustainable projects.",
    listingDate: "2024-11-05",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
  {
    id: 10,
    sellerName: "West Bengal Timbers",
    timberType: "Sal",
    category: "Construction",
    subCategory: "Reliable Wood",
    description: "Sturdy sal wood for reliable construction.",
    listingDate: "2024-11-04",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://example.com/image4.jpg",
      "https://example.com/image5.jpg",
    ],
  },
];

const exportToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Timber Listings");
  XLSX.writeFile(workbook, "Timber_Listings.xlsx");
};

export default function TimberListingsTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewDetails = (id) => {
    const encodedId = encodeURIComponent(id);
    navigate(`/timberdetail?tid=${encodedId}`);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          onClick={() => exportToExcel(timberListings)}
          style={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
        >
          Export as Excel
        </Button>
      </Box>

      <h2>Timber Listings</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "18px",
                      fontStyle: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timberListings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontSize: "14px",
                              fontFamily: "Times New Roman, Times, serif",
                            }}
                          >
                            {column.id === "action" ? (
                              <Button
                                variant="danger"
                                onClick={() => handleViewDetails(row.id)}
                              >
                                Details
                              </Button>
                            ) : column.id === "verifiedProducts" ||
                              column.id === "disapprovalProducts" ? (
                              value ? (
                                "Yes"
                              ) : (
                                "No"
                              )
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={timberListings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-displayedRows": {
              marginTop: "1em",
              marginBottom: "1em",
            },
            ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
              {
                marginTop: "1em",
                marginBottom: "1em",
                fontSize: "18px",
              },
            ".MuiSvgIcon-root": {
              fontSize: "27px",
            },
          }}
        />
      </Paper>
    </Container>
  );
}
