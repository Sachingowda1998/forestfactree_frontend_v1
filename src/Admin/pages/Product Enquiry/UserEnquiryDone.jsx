import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, Button, TextField, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { tokens } from "../../theme";
import Stack from "@mui/material/Stack";

import * as XLSX from "xlsx";

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
    label: "ProductName",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "EnquirySendRequestDate",
    label: "Enquiry Send Req. Date",
    minWidth: 170,
    align: "right",
    format: (value) => formatDate(value),
  },
  // {
  //   id: "Action",
  //   label: "Action",
  //   minWidth: 170,
  //   align: "right",
  // },
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
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    Phone: "9876543210",
    ProductName: "Pine Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-25",
  },
  {
    id: 3,
    name: "Emily Johnson",
    Phone: "5551234567",
    ProductName: "Mahogany Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-02",
  },
  {
    id: 4,
    name: "Michael Brown",
    Phone: "5559876543",
    ProductName: "Teak Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-22",
  },
  {
    id: 5,
    name: "David Lee",
    Phone: "5552468101",
    ProductName: "Maple Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-03",
  },
  {
    id: 6,
    name: "Sarah Davis",
    Phone: "5551357924",
    ProductName: "Cedar Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-28",
  },
  {
    id: 7,
    name: "James Wilson",
    Phone: "5558642097",
    ProductName: "Balsa Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    Phone: "5553765289",
    ProductName: "Ash Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-29",
  },
  {
    id: 9,
    name: "William Garcia",
    Phone: "5551472589",
    ProductName: "Redwood Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-02",
  },
  {
    id: 10,
    name: "Sophia Taylor",
    Phone: "5553698745",
    ProductName: "Birch Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-30",
  },
  {
    id: 11,
    name: "Daniel Harris",
    Phone: "5552589634",
    ProductName: "Spruce Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-04",
  },
  {
    id: 12,
    name: "Isabella Clark",
    Phone: "5554785210",
    ProductName: "Cherry Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-27",
  },
  {
    id: 13,
    name: "Benjamin Lewis",
    Phone: "5551597534",
    ProductName: "Walnut Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-03",
  },
  {
    id: 14,
    name: "Charlotte Walker",
    Phone: "5557531592",
    ProductName: "Fir Timber",
    Status: "Enquiry Done",
    EnquirySendRequestDate: "2024-09-23",
  },
  {
    id: 15,
    name: "Elijah Allen",
    Phone: "5553216549",
    ProductName: "Douglas Fir Timber",
    Status: "Pending",
    EnquirySendRequestDate: "2024-10-01",
  },
];

export default function UserEnquiryDone() {
  const [page, setPage] = React.useState(0);
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

  // Filter rows where status is "Enquiry Done"
  const filteredRows = rows.filter((row) => row.Status === "Enquiry Done");

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
    XLSX.writeFile(workbook, "Seller_Data.xlsx");
  };

  const handleViewDetails = (id) => {
    navigate(`/userenquirydetails?urid=${id}`);
  };

  return (
    <div>
      <Container>
        <h2>User Enquiry Pending</h2>
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

        {/* <Box display="flex" justifyContent="space-between" marginBottom="10px">
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Uncontrolled picker"
                  defaultValue={dayjs("2022-04-17")}
                  sx={{ width: "100%" }} // Ensure it takes up the full width of the container
                />
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  sx={{ width: "100%" }} // Ensure it takes up the full width of the container
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <TextField id="outlined-required" label="Search" />
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
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "white" }}>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
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
