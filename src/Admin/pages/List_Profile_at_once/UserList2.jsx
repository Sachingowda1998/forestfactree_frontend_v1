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
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Location.", minWidth: 100 },
  {
    id: "population",
    label: "PhoneNO.",
    minWidth: 170,
    align: "right",
    format: (value) => formatPhone(value),
  },
  {
    id: "size",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actionEnabled",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

const rows = [
  {
    id: 1,
    name: "India",
    code: "IN",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 2,
    name: "China",
    code: "CN",
    population: 1234567890,
    size: "active",
    actionEnabled: true,
  },
  {
    id: 3,
    name: "Italy",
    code: "IT",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 4,
    name: "United States",
    code: "US",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 5,
    name: "Canada",
    code: "CA",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 6,
    name: "Australia",
    code: "AU",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 7,
    name: "Germany",
    code: "DE",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 8,
    name: "Ireland",
    code: "IE",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 9,
    name: "Mexico",
    code: "MX",
    population: 1234567890,
    size: "BAN",
    actionEnabled: false,
  },
  {
    id: 10,
    name: "Japan",
    code: "JP",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 11,
    name: "France",
    code: "FR",
    population: 1234567890,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 12,
    name: "United Kingdom",
    code: "GB",
    population: 67545757,
    size: "BAN",
    actionEnabled: false,
  },
  {
    id: 13,
    name: "Russia",
    code: "RU",
    population: 146793744,
    size: "Active",
    actionEnabled: true,
  },
  {
    id: 14,
    name: "Nigeria",
    code: "NG",
    population: 200962417,
    size: "BAN",
    actionEnabled: false,
  },
  {
    id: 15,
    name: "Brazil",
    code: "BR",
    population: 210147125,
    size: "Active",
    actionEnabled: true,
  },
];

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

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
  XLSX.writeFile(workbook, "User_Data.xlsx");
};

export default function UserList2() {
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

  const handleChangeConnect = (id) => {
    const encodedId = encodeURIComponent(id);
    navigate(`/buyersdetails?uid=${encodedId}`);
  };

  return (
    <div>
      <Container>
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

        <h2>All users(Customer) List</h2>
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
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                fontSize: "18px",
                                fontStyle: "bold",
                                color: "black",
                              }}
                            >
                              {column.id === "actionEnabled" ? (
                                <Button
                                  variant="danger"
                                  onClick={() => handleChangeConnect(row.id)}
                                >
                                  {/* {row.isConnected ? "View Details" : "Connect"} */}
                                  Details
                                </Button>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
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