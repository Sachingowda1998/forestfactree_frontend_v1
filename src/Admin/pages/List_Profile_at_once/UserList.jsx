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
// import { Margin } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "Location", label: "Location", minWidth: 100 },
  {
    id: "PNumber",
    label: "PhoneNO.",
    maxWidth: 10,
    align: "center",
    // format: (value) => value.toFixed(2),
    format: (value) => formatPhone(value),
  },
  {
    id: "Status",
    label: "Status",
    align: "center",
  },
  {
    id: "Action",
    label: "Action",
    align: "right",
  },
];

function createData(name, Location, PNumber, Status, isConnected) {
  return { name, Location, PNumber, Status, isConnected };
}

const data = [
  createData("John", "IN", 1234567890, "Active", true),
  createData("China", "CN", 1234567890, "Active", false),
  createData("Italy", "IT", 1234567890, "Active", true),
  createData("United States", "US", 1234567890, "Active", true),
  createData("Canada", "CA", 1234567890, "Active", true),
  createData("Australia", "AU", 1234567890, "Active", false),
  createData("Germany", "DE", 1234567890, "Banned", false),
  createData("Ireland", "IE", 1234567890, "Banned", true),
  createData("Mexico", "MX", 1234567890, "Active", true),
  createData("Japan", "JP", 1234567890, "Banned", false),
  createData("France", "FR", 1234567890, "Active", true),
  createData("United Kingdom", "GB", 1234567890, "Banned", true),
  createData("Russia", "RU", 1234567890, "Active", true),
  createData("Nigeria", "NG", 1234567890, "Active", false),
  createData("Brazil", "BR", 1234567890, "Active", true),
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

export default function UserList() {
  const theme = useTheme();

  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);
  //hooks
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeConnect = (id) => {
    alert(id, "hisdsd");
  };

  return (
    <div>
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/adduser")}
          >
            ADD Users +
          </Button>
        </Box>

        <h2>All users(Customer) List</h2>
      </Container>
      <div style={{ padding: "0 20px" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }} Container>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.uniqueId}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ fontSize: "16px" }}
                            >
                              {column.id === "Action" ? (
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
          />
        </Paper>
      </div>
    </div>
  );
}
