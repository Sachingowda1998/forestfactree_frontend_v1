import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  useTheme,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { tokens } from "../../theme";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import * as XLSX from "xlsx";

const sellers = [
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

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "timberType", label: "Timber Type", minWidth: 120 },
  { id: "category", label: "Category", minWidth: 120 },
  { id: "listingDate", label: "listingDate", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 150, align: "right" },
];

const rows = sellers.map((seller) => ({
  id: seller.id,
  timberType: seller.timberType,
  category: seller.category,
  listingDate: seller.listingDate, // Add this line
  action: true,
}));

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
  XLSX.writeFile(workbook, "Seller_Data.xlsx");
};

export default function TimberListingsTable2() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeConnect = (id) => {
    navigate("/productdetails");
    console.log(id);
  };

  return (
    <div>
      <Container>
        <h2>Sellers Req.</h2>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            onClick={exportToExcel}
            style={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
            }}
          >
            Export as Excel
          </Button>
        </Box>

        {/* <Box
          display="flex"
          justifyContent="space-between"
          marginBottom="10px"
          flexWrap="wrap"
        >
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Uncontrolled picker"
                  defaultValue={dayjs("2022-04-17")}
                  sx={{ width: "100%" }}
                />
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Stack
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
            width={{ xs: "100%", sm: "auto" }}
            alignItems="flex-start"
            
          >
            <TextField
              id="outlined-required"
              label="Search"
              sx={{
                width: { xs: "100%", sm: "auto" },
                           }}
            />
            <Button
              variant="contained"
              className="search-button-style"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Search
            </Button>
          </Stack>
        </Box> */}

        <Box
          display="flex"
          justifyContent="space-between"
          marginBottom="10px"
          flexWrap="wrap"
        >
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Uncontrolled picker"
                  defaultValue={dayjs("2022-04-17")}
                  sx={{ width: "100%" }}
                />
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Stack
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
            width={{ xs: "100%", sm: "auto" }}
            alignItems="flex-start"
            sx={{
              marginTop: { xs: 2, sm: 2, md: 0, lg: 0 }, // Apply marginTop for xs as well
            }}
          >
            <TextField
              id="outlined-required"
              label="Search"
              sx={{
                width: { xs: "100%", sm: "auto" },
                marginTop: { xs: 2, sm: 2 }, // Apply marginTop for xs as well
              }}
            />
            <Button
              variant="contained"
              className="search-button-style"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Search
            </Button>
          </Stack>
        </Box>

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
                        fontWeight: "bold",
                        backgroundColor: "#a9a9a9",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: "white" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            {column.id === "action" ? ( // Check for 'action' column
                              <Button
                                variant="danger"
                                onClick={() => handleChangeConnect(row.id)}
                              >
                                Details
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
    </div>
  );
}
