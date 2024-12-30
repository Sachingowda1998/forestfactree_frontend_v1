import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddSubCategoryModal from "../Models/AddSubCategoryModal ";
import * as XLSX from "xlsx";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const categories = [
  { id: 1, category: "Teak" },
  { id: 2, category: "Rosewood" },
  { id: 3, category: "Bamboo" },
  { id: 4, category: "Sandalwood" },
];

const columns = [
  { id: "serial", label: "Serial No.", minWidth: 100 },
  { id: "categoryName", label: "Category Name", minWidth: 170 },
  { id: "subCategoryName", label: "Sub-Category Name", minWidth: 170 },
  { id: "ProductName", label: "ProductName", minWidth: 170 },
  { id: "productDate", label: "productDate", minWidth: 170 },
  { id: "Hide", label: "Hide", minWidth: 200, align: "center" },
];

const rows = [
  {
    id: 1,
    categoryName: "Teak",
    subCategoryName: "Premium Teak Wood",
    productName: "Teak Luxury Planks",
    productDate: "2024-11-01",
    Hide: true,
  },
  {
    id: 2,
    categoryName: "Rosewood",
    subCategoryName: "Indian Rosewood",
    productName: "Rosewood Tables",
    productDate: "2024-10-15",
    Hide: true,
  },
  {
    id: 3,
    categoryName: "Bamboo",
    subCategoryName: "Bamboo Sticks",
    productName: "Bamboo Garden Fencing",
    productDate: "2024-09-20",
    Hide: true,
  },
  {
    id: 4,
    categoryName: "Sandalwood",
    subCategoryName: "Mysore Sandalwood",
    productName: "Sandalwood Incense",
    productDate: "2024-08-30",
    Hide: true,
  },
];

// Now the rows include productName, productDate, and hide is last
const updatedRows = rows.filter((row) => !row.Hide);

console.log(updatedRows);

const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    console.log(`Delete item with id: ${id}`);
  }
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
  XLSX.writeFile(workbook, "Hide_products.xlsx");
};

export default function HideProductsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [subCategoryRows, setSubCategoryRows] = React.useState(rows);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleAddCategory = (newCategory) => {
    setSubCategoryRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, ...newCategory },
    ]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleStatus = (id) => {
    setSubCategoryRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, Hide: !row.Hide } : row))
    );
  };

  return (
    <div>
      <Container>
        <Box display="flex" justifyContent="space-between" marginBottom="10px">
          <h2>Hide Products</h2>
          <Box display="flex" gap="10px">
            <Button
              onClick={exportToExcel}
              style={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Export as Excel
            </Button>
          </Box>
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
        <AddSubCategoryModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleAddCategory={handleAddCategory}
          categories={categories}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sub-category table">
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
                {subCategoryRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {row.productName}
                      </TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {row.categoryName}
                      </TableCell>

                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {row.subCategoryName}
                      </TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {row.productDate}
                      </TableCell>
                      <TableCell align="center">
                        {/* <IconButton
                          color="primary"
                          onClick={() =>
                            console.log(`Edit item with id: ${row.id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton> */}
                        <Button
                          variant="contained"
                          color={row.isActive ? "success" : "warning"}
                          onClick={() => toggleStatus(row.id)}
                          sx={{ marginLeft: "8px" }}
                        >
                          {row.isActive ? "Active" : "Inactive"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={subCategoryRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                {
                  marginTop: "1em",
                  marginBottom: "1em",
                  fontSize: "18px",
                },
              ".MuiSvgIcon-root": {
                fontSize: "27px",
                color: "#333",
              },
              backgroundColor: "#f0f0f0", // Background color
              color: "#333", // Text color
            }}
          />
        </Paper>
      </Container>
    </div>
  );
}
