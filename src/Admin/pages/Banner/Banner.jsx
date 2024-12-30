import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "react-bootstrap";
import { Box, Container, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AddBannerModel from "../Models/AddBannerModel"; // Ensure this is your modal component

const columns = [
  { id: "serial", label: "Serial No.", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "banner", label: "Banner", minWidth: 170, align: "center" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

const rows = [
  { id: 1, title: "Teak", banner: "/assets/carousel-1.jfif" },
  { id: 2, title: "Rosewood", banner: "/assets/carousel111.jpg" },
  { id: 3, title: "Bamboo", banner: "/assets/wood9.jpg" },
  { id: 4, title: "Sandalwood", banner: "/assets/wood12.jpg" },
];

const handleDelete = (id) => {
  const bofore = window.confirm("Are you sure you want to delete?");
  if (bofore) {
    console.log(`Delete item with id: ${id}`);
  }
};

export default function Banner() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Container>
        <Box display="flex" justifyContent="space-between" marginBottom="10px">
          <h2>Banners</h2>
          <Button
            onClick={handleOpenModal} // Open modal when button is clicked
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Add Banners
          </Button>
        </Box>

        <AddBannerModel open={isModalOpen} handleClose={handleCloseModal} />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="banner table">
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
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                      <TableCell style={{ fontSize: "18px", color: "black" }}>
                        {row.title}
                      </TableCell>
                      <TableCell align="center">
                        <img
                          src={row.banner}
                          alt={row.title}
                          width="50"
                          height="50"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
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
