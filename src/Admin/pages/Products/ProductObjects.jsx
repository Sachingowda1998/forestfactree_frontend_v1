import React, { useEffect } from "react";
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
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { MenuItem, Select } from '@mui/material'; 
import Swal from 'sweetalert2'; // Add this import for SweetAlert
import { Modal } from "react-bootstrap";

import * as XLSX from "xlsx";


export default function ProductObjects() {


let[allproducts, updateAllProducts] = useState([]);
let[errormsg, updateErrorMsg] = useState();

const [searchQuery, setSearchQuery] = useState("");

const [showModal, setShowModal] = useState(false);
const [selectedImages, setSelectedImages] = useState([]);

const formatDate = (dateString) => { 
  const date = new Date(dateString); 
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based 
  const year = date.getFullYear(); 
  return `${day}-${month}-${year}`; 
};


const getAllProducts = async() => {

  let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/all`;

  try{
  await fetch(url)
  .then(response=>response.json())
  .then(data=>{
    updateAllProducts(data.products);
  })
  }catch(error){
    updateErrorMsg("Network Error. Please Try Later");
  }

}
 
  useEffect(()=>{
    getAllProducts();
  },[]);

  const rows = allproducts.map((product, index) => ({
    SerialNo : index+1,
    ProductAddedDate : formatDate(product.productAddedDate),
    ProductName : product.productName,
    ShortDescription: product.shortDescription,
    LongDescription: product.longDescription,
    Weight : product.weight,
    Units : product.units,
    Category : product.category,
    Subcategory : product.subcategory,
    Images: product.images,
    action : true,
    _id: product._id,
  }));

  const filteredRows = rows.filter(row => {
    return (
      row.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.ShortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Weight.toString().includes(searchQuery) ||
      row.LongDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Units.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }); 


  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 50 },
    { id: "ProductAddedDate", label: "Product Added On", minWidth: 100 },
    { id: "ProductName", label: "Name", minWidth: 150, align: "center" },
    {
      id: "ViewImages",
      label: "View Images",
      minWidth: 150,
      align: "center",
    },
    {
      id: "ShortDescription",
      label: "Short Description",
      minWidth: 300,
      align: "left",
    },
    {
      id: "LongDescription",
      label: "Long Description",
      minWidth: 300,
      align: "left",
    },
    { id: "Weight", label: "Quantity", minWidth: 150, align: "center" },
    { id: "Units", label: "Units", minWidth: 150, align: "center" },
    { id: "Category", label: "Category", minWidth: 150, align: "center" },
    { id: "Subcategory", label: "Subcategory", minWidth: 150, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },

    
  ];



  const theme = useTheme();
  const navigate = useNavigate();
  //   const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    navigate(`/admin/editaproductobject/${id}`);
  };
  const handleDelete = (id) => {
    // navigate("/productdetails");
    console.log(id);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
    XLSX.writeFile(workbook, "Seller_Data.xlsx");
  };

  const handleViewImages = (images) => {
    setSelectedImages(images);
    console.log(images);
    setShowModal(true);
  };

  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-3"> Product List </h2>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4} md={2}>
          <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => navigate("/admin/addproductobjectform")}
          >
            Add Product
          </Button>
            </Grid>

            <Grid item xs={12} sm={8} md={10}>
              
              <Stack direction="row" spacing={1}>
                
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products"
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
                

                {/* Search Button */}
                {/* <Grid item xs={12} sm={4} md={4} lg={3}>
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
                </Grid> */}
              </Stack>
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
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.SellerID}
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
                            {column.id === "action" ? (
                              
                              <>
                                <EditIcon
                                  fontSize="small"
                                  sx={{
                                    "&:hover": {
                                      color: "rgba(255, 0, 0, 0.5) !important",
                                    },
                                  }}
                                  onClick={() => handleEdit(row._id)}
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
                            ) : column.id === "ViewImages" ? (
                              <Button
                                variant="link"
                                onClick={() => handleViewImages(row.Images)}
                              >
                                View Images
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
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


      {/* Modal for Viewing Images */}
      <Modal className="text-dark" show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-wrap">
            {selectedImages.map((image, index) =>
            (
              <img
                key={index}
                src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                alt={`Product Image ${index + 1}`}
                className="img-fluid m-2"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
