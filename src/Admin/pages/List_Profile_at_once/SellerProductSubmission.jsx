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
    id: "1",
    name: "Ravi Kumar",
    email: "ravikumar@example.com",
    phoneNo: "9876543210",
    whatsappNo: "9876543210",
    location: "Delhi",
    state: "Delhi",
    address: "123, Connaught Place",
    country: "India",
    pincode: "110001",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priyasharma@example.com",
    phoneNo: "9988776655",
    whatsappNo: "9988776655",
    location: "Mumbai",
    state: "Maharashtra",
    address: "456, Andheri West",
    country: "India",
    pincode: "400058",
    status: "Pendig",
    date: "2024-11-14",
  },
  {
    id: "3",
    name: "Vikram Yadav",
    email: "vikramyadav@example.com",
    phoneNo: "9876012345",
    whatsappNo: "9876012345",
    location: "Bengaluru",
    state: "Karnataka",
    address: "789, Whitefield",
    country: "India",
    pincode: "560066",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "4",
    name: "Anita Desai",
    email: "anitadesai@example.com",
    phoneNo: "9123456789",
    whatsappNo: "9123456789",
    location: "Chennai",
    state: "Tamil Nadu",
    address: "101, T Nagar",
    country: "India",
    pincode: "600017",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "5",
    name: "Ajay Singh",
    email: "ajaysingh@example.com",
    phoneNo: "8456739210",
    whatsappNo: "8456739210",
    location: "Hyderabad",
    state: "Telangana",
    address: "202, Banjara Hills",
    country: "India",
    pincode: "500034",
    status: "Pendig",
    date: "2024-11-14",
  },
  {
    id: "6",
    name: "Sonia Patel",
    email: "soniapatel@example.com",
    phoneNo: "9234785621",
    whatsappNo: "9234785621",
    location: "Ahmedabad",
    state: "Gujarat",
    address: "303, Navrangpura",
    country: "India",
    pincode: "380009",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "7",
    name: "Amit Kapoor",
    email: "amitkapoor@example.com",
    phoneNo: "9776452389",
    whatsappNo: "9776452389",
    location: "Lucknow",
    state: "Uttar Pradesh",
    address: "404, Hazratganj",
    country: "India",
    pincode: "226001",
    status: "Pendig",
    date: "2024-11-14",
  },
  {
    id: "8",
    name: "Neha Gupta",
    email: "nehagupta@example.com",
    phoneNo: "8001234567",
    whatsappNo: "8001234567",
    location: "Kolkata",
    state: "West Bengal",
    address: "505, Salt Lake",
    country: "India",
    pincode: "700091",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "9",
    name: "Suresh Reddy",
    email: "sureshreddy@example.com",
    phoneNo: "9745632100",
    whatsappNo: "9745632100",
    location: "Pune",
    state: "Maharashtra",
    address: "606, Kothrud",
    country: "India",
    pincode: "411038",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "10",
    name: "Simran Kaur",
    email: "simrankaur@example.com",
    phoneNo: "9876765432",
    whatsappNo: "9876765432",
    location: "Chandigarh",
    state: "Chandigarh",
    address: "707, Sector 17",
    country: "India",
    pincode: "160017",
    status: "Pendig",
    date: "2024-11-14",
  },
  {
    id: "11",
    name: "Arun Joshi",
    email: "arunjoshi@example.com",
    phoneNo: "9987654321",
    whatsappNo: "9987654321",
    location: "Noida",
    state: "Uttar Pradesh",
    address: "808, Sector 62",
    country: "India",
    pincode: "201301",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "12",
    name: "Maya Rao",
    email: "mayarao@example.com",
    phoneNo: "9112233445",
    whatsappNo: "9112233445",
    location: "Jaipur",
    state: "Rajasthan",
    address: "909, Vaishali Nagar",
    country: "India",
    pincode: "302021",
    status: "Pendig",
    date: "2024-11-14",
  },
  {
    id: "13",
    name: "Ravi Tiwari",
    email: "ravitiwari@example.com",
    phoneNo: "8223344556",
    whatsappNo: "8223344556",
    location: "Indore",
    state: "Madhya Pradesh",
    address: "1010, Vijay Nagar",
    country: "India",
    pincode: "452010",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "14",
    name: "Sweta Agarwal",
    email: "swetaagarwal@example.com",
    phoneNo: "9822334455",
    whatsappNo: "9822334455",
    location: "Surat",
    state: "Gujarat",
    address: "1111, Ring Road",
    country: "India",
    pincode: "395003",
    status: "Active",
    date: "2024-11-14",
  },
  {
    id: "15",
    name: "Aman Bhatia",
    email: "amanbhatia@example.com",
    phoneNo: "9345678901",
    whatsappNo: "9345678901",
    location: "Patna",
    state: "Bihar",
    address: "1212, Boring Road",
    country: "India",
    pincode: "800001",
    status: "Pendig",
    date: "2024-11-14",
  },
];

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phoneNo", label: "Phone No.", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 150 },
  { id: "state", label: "State", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "actionEnabled", label: "Action", minWidth: 170, align: "right" },
];

const rows = sellers.map((seller) => ({
  id: seller.id,
  name: seller.name,
  phoneNo: seller.phoneNo,
  date: seller.date,
  state: seller.state,
  status: seller.status,
  actionEnabled: true,
}));

const formatPhone = (phoneNumberString) => {
  let newPhoneNumberString = ("" + phoneNumberString).replace(/[a-zA-Z]/g, "");
  let cleaned = ("" + newPhoneNumberString).replace(/\D/g, "").slice(0, 10);
  if (cleaned.length === 10) {
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  return phoneNumberString;
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
  XLSX.writeFile(workbook, "Seller_Data.xlsx");
};

export default function SellerProductSubmission() {
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
    const encodedId = encodeURIComponent(id);
    navigate(`/sellerdetail?uid=${encodedId}`);
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
                            {column.id === "actionEnabled" ? (
                              <Button
                                variant="danger"
                                onClick={() => handleChangeConnect(row.id)}
                              >
                                Details
                              </Button>
                            ) : column.id === "phoneNo" ? (
                              formatPhone(value)
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
      <div></div>
    </div>
  );
}
