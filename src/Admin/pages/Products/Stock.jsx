import React from "react";
import dayjs from "dayjs";
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
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
// import { tokens } from "../../theme";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

// import * as XLSX from "xlsx";

const columns = [
  { id: "SlNo", label: "Slno.", minWidth: 50 },
  { id: "ProductName", label: "Product Name", minWidth: 150 },
  {
    id: "Category",
    label: "Category",
    minWidth: 200,
    align: "center",
  },
  {
    id: "SubCategory",
    label: "SubCategory",
    minWidth: 200,
    align: "center",
  },
  {
    id: "AvailableStock",
    label: "Available Stock",
    minWidth: 120,
    align: "center",
  },
  { id: "Date", label: "Date", minWidth: 100 },
];

const enquiryData = [
  {
    SlNo: 1,
    ProductName: "Timber Oak Wood",
    Category: "Wood",
    SubCategory: "Oak",
    AvailableStock: 100,
    Date: "2024-11-15",
  },
  {
    SlNo: 2,
    ProductName: "Pine Wood",
    Category: "Wood",
    SubCategory: "Pine",
    AvailableStock: 200,
    Date: "2024-11-14",
  },
  {
    SlNo: 3,
    ProductName: "Maple Wood",
    Category: "Wood",
    SubCategory: "Maple",
    AvailableStock: 150,
    Date: "2024-11-10",
  },
  {
    SlNo: 4,
    ProductName: "Cedar Wood",
    Category: "Wood",
    SubCategory: "Cedar",
    AvailableStock: 50,
    Date: "2024-11-12",
  },
  {
    SlNo: 5,
    ProductName: "Mahogany Wood",
    Category: "Wood",
    SubCategory: "Mahogany",
    AvailableStock: 75,
    Date: "2024-11-18",
  },
  {
    SlNo: 6,
    ProductName: "Redwood Timber",
    Category: "Wood",
    SubCategory: "Redwood",
    AvailableStock: 120,
    Date: "2024-11-11",
  },
  {
    SlNo: 7,
    ProductName: "Teak Wood",
    Category: "Wood",
    SubCategory: "Teak",
    AvailableStock: 250,
    Date: "2024-11-17",
  },
  {
    SlNo: 8,
    ProductName: "Bamboo",
    Category: "Grass",
    SubCategory: "Bamboo",
    AvailableStock: 500,
    Date: "2024-11-13",
  },
  {
    SlNo: 9,
    ProductName: "Spruce Wood",
    Category: "Wood",
    SubCategory: "Spruce",
    AvailableStock: 180,
    Date: "2024-11-16",
  },
  {
    SlNo: 10,
    ProductName: "Birch Wood",
    Category: "Wood",
    SubCategory: "Birch",
    AvailableStock: 90,
    Date: "2024-11-19",
  },
];

const rows = enquiryData.map((seller) => ({
  SlNo: seller.SlNo,
  ProductName: seller.ProductName || "Not Provided",
  Category: seller.Category || "Not Provided",
  SubCategory: seller.SubCategory || "Not Provided",
  AvailableStock: seller.AvailableStock || 0, // Assuming stock is dynamically calculated elsewhere
  Date: seller.Date || "N/A", // Renamed to 'Date' for consistency
}));

export default function ProductObjectsStock() {
  //   const theme = useTheme();
  const navigate = useNavigate();
  //   const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   const exportToExcel = () => {
  //     const worksheet = XLSX.utils.json_to_sheet(rows);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
  //     XLSX.writeFile(workbook, "Seller_Data.xlsx");
  //   };

  return (
    <div style={{ marginBottom: "3px" }}>
      <Container>
        <h2 style={{ color: "black" }}>Stock List</h2>
        {/* <Box display="flex" justifyContent="flex-end">
          <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => navigate("/addproductobjectform")}
          >
            Add Product
          </Button>
        </Box> */}

        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search customers"
                  InputProps={{
                    startAdornment: (
                      <IconButton sx={{ color: "black" }}>
                        <SearchIcon sx={{ color: "black" }} />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "blue",
                    height: "50px",
                    color: "white",
                  }}
                  fullWidth
                >
                  Search
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="Start Date"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="End Date"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInputBase-input": {
                    color: "black",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "blue",
                  height: "50px",
                  color: "white",
                  width: "100%",
                }}
                startIcon={<FileCopyIcon />}
                fullWidth
              >
                Export to Excel
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="seller table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: "18px",
                        backgroundColor: "#f5f5f5",
                        color: "#000",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#fff" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.SlNo}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              fontSize: "16px",
                              color: "#333",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: "#fff",
              color: "#fff",
              borderBottom: "1px solid black",
              borderTop: "1px solid black",
              ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                {
                  marginTop: "1em",
                  marginBottom: "1em",
                  fontSize: "16px",
                  color: "black",
                },
              ".MuiSelect-icon": {
                color: "black",
              },
              ".MuiSvgIcon-root": {
                color: "black",
              },
              ".MuiTablePagination-actions": {
                color: "black",
              },
              ".MuiTablePagination-select": {
                color: "blue",
              },
            }}
          />
        </Paper>
      </Container>
    </div>
  );
}
