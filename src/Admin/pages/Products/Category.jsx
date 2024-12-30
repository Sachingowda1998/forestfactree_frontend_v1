import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, useTheme, useMediaQuery, Grid, Stack, TextField } from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AddCategoryModal from "../Models/AddCategoryModal ";



export default function Category() {

  let[allcategories, updateAllCategories] = useState([]);
  let[errormsg, updateErrorMsg] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getAllCategories = async() => {
     let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories`;

     try{
      await fetch(url)
     .then(response=>response.json())
     .then(data=>{
      updateAllCategories(data);
     })
    }catch(error){
      updateErrorMsg("Network Error. Please Try Later");
    }
  }


  const rows = allcategories.map((category, index) => ({
    SerialNo: index+1,
    Name : category.name,
    CategoryDescription : category.cdescp,
    _id: category._id,
    action: true,
  }));

  const filteredRows = rows.filter(row => {
    return (
      row.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.CategoryDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }); 

  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 10 },
    { id: "Name", label: "Name", minWidth: 200 },
    {
      id: "CategoryDescription",
      label: "Description",
      minWidth: 300,
      align: "left",
    },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
  ];
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "Category.xlsx");
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [timberRows, setTimberRows] = React.useState(rows);
  // const [isModalOpen, setModalOpen] = React.useState(false);

  // const handleOpenModal = () => setModalOpen(true);
  // const handleCloseModal = () => setModalOpen(false);


  useEffect(()=>{
    getAllCategories();
  },[]);


  // const handleAddCategory = (newCategory) => {
  //   setTimberRows((prevRows) => [
  //     ...prevRows,
  //     { id: prevRows.length + 1, ...newCategory },
  //   ]);
  // };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // const toggleStatus = (id) => {
  //   setTimberRows((prevRows) =>
  //     prevRows.map((row) =>
  //       row.id === id ? { ...row, isActive: !row.isActive } : row
  //     )
  //   );
  // };

  const handleChangeConnect = (id) => {
    console.log(id);
    navigate(`/admin/editacategory/${id}`);  // Navigate to EditBuyerForm with the buyer ID
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories/delete/${id}`, {
          method: "DELETE",
        });
  
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Deleted!", data.message, "success");
          getAllCategories();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };
  

  
  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-4">All Categories</h2>
        
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">

          <Grid item xs={12} sm={4} md={2}>
            <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => navigate("/admin/addacategory")}
          >
            Add Category
            </Button>
            </Grid>


            {/* Search Field and Button */}
            <Grid item xs={12} sm={8} md={10}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search categories"
                  value={searchQuery} // Add this line to bind the search query state 
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    "& .MuiInputBase-input": { 
                      color: "black", // Ensures the typed text is visible
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "black",
                    },
                  }}
                />

              </Stack>
            </Grid>
          </Grid>
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
                        backgroundColor: "#a9a9a9",
                        border: "none", // Remove border globally
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
                            style={{
                              fontSize: "16px",
                              border: "none", // Remove border globally for table body

                              color: "black",
                            }}
                          >
                            {column.id === "action" ? (
                              <>
                                <EditIcon
                                  fontSize="small"
                                  sx={{
                                    "&:hover": {
                                      color: "rgba(255, 0, 0, 0.5) !important",
                                    },
                                  }}
                                  onClick={() => handleChangeConnect(row._id)}
                                />
                                <DeleteIcon
        fontSize="small"
        sx={{
          "&:hover": {
            color: "rgba(255, 0, 0, 0.5) !important", // Red on hover
          },
          color: "red",  // Set the default color to red
          ml: 2,  // Margin-left for spacing between Edit and Delete icons
        }}
        onClick={() => handleDelete(row._id)}  // Delete handler
      />
                              </>
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
            count={filteredRows.length}
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
