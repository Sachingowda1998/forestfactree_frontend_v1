import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import { Container, Button, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { tokens } from "../../theme";
import {
  Container,
  Button,
  Box,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import UserEnquiryModal from "../Models/UserEnquiryModal";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "Phone",
    label: "PhoneNO",
    minWidth: 100,
    format: (value) => formatPhone(value),
  },
  {
    id: "ProductName",
    label: "Product Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "ProductCategory",
    label: "Product Category",
    minWidth: 70,
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 140,
    align: "center",
  },
  {
    id: "EnquirySendRequestDate",
    label: "Enquiry Send Req. Date",
    minWidth: 140,
    align: "right",
    format: (value) => formatDate(value),
  },
  {
    id: "LastUpdated",
    label: "Last Updated",
    minWidth: 170,
    align: "right",
    format: (value) => formatDate(value),
  },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US");
};

const formatPhone = (phoneNumberString, remove = false) => {
  let newPhoneNumberString = ("" + phoneNumberString).replace(/[a-zA-Z]/g, "");
  let cleaned = ("" + newPhoneNumberString).replace(/\D/g, "").slice(0, 10);
  if (remove) {
    return cleaned;
  }
  if (formatPhone(newPhoneNumberString, true).length === 10) {
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
  }
  return newPhoneNumberString;
};

const rows = [
  {
    id: 1,
    name: "John Doe",
    Phone: "1234567890",
    ProductName: "Oak Timber",
    ProductCategory: "Wood",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01", // Example date
    LastUpdated: "2024-10-05", // Example last updated date
  },
  {
    id: 2,
    name: "Jane Smith",
    Phone: "9876543210",
    ProductName: "Pine Timber",
    ProductCategory: "Wood",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-25",
    LastUpdated: "2024-09-28",
  },
  {
    id: 3,
    name: "Emily Johnson",
    Phone: "5551234567",
    ProductName: "Mahogany Timber",
    ProductCategory: "Wood",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-02",
    LastUpdated: "2024-10-06",
  },
  {
    id: 4,
    name: "Michael Brown",
    Phone: "5559876543",
    ProductName: "Teak Timber",
    ProductCategory: "Wood",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-22",
    LastUpdated: "2024-09-24",
  },
  {
    id: 5,
    name: "David Lee",
    Phone: "5552468101",
    ProductName: "Maple Timber",
    ProductCategory: "Wood",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-03",
    LastUpdated: "2024-10-07",
  },
];

export default function UserEnquiry() {
  const [page, setPage] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
    XLSX.writeFile(workbook, "User_Enquiry.xlsx");
  };

  return (
    <div>
      <Container>
        <h2>User Enquiry</h2>
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

        <UserEnquiryModal open={isModalOpen} handleClose={handleCloseModal} />

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
                        fontSize: "15px",
                        fontStyle: "bold",
                        backgroundColor: "#a9a9a9",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* <TableBody sx={{ backgroundColor: "white" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "ProductName") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "black" }}
                              >
                                {row.ProductName} ({row.ProductCategory})
                              </TableCell>
                            );
                          }
                          if (column.id === "Status") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "black" }}
                              >
                                {value} <EditIcon sx={{ marginLeft: 1 }} />
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ color: "black" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody> */}
              <TableBody sx={{ backgroundColor: "white" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "ProductName") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "black" }}
                              >
                                {row.ProductName} ({row.ProductCategory})
                              </TableCell>
                            );
                          }
                          if (column.id === "Status") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "black" }}
                              >
                                {value}{" "}
                                <EditIcon
                                  sx={{
                                    marginLeft: 1,
                                    cursor: "pointer", // Cursor changes to pointer
                                    "&:hover": {
                                      color: "green", // Green on hover
                                    },
                                  }}
                                  onClick={handleOpenModal}
                                />
                              </TableCell>
                            );
                          }
                          if (column.id === "LastUpdated") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: "black" }}
                              >
                                {column.format && typeof value === "string"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ color: "black" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-displayedRows": {
                "margin-top": "1em",
                "margin-bottom": "1em",
              },
              ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                {
                  "margin-top": "1em",
                  "margin-bottom": "1em",
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
