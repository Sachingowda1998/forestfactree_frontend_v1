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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete'; 
import * as XLSX from "xlsx";
import { DownloadInvoice } from "../Products/SalesHistoryBill2";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const order = {
  _id: "123456",
  address: {
    firstName: "John",
    lastName: "Doe",
    addressLine1: "123 Maple Street",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "Illinois",
    zipCode: "62704",
  },
  paymentTerm: "Net 30",
  type: "Credit Card",
  price: 1500, // Total price
  orderDate: "2024-11-21T10:30:00.000Z",
  items: [
    {
      productName: "Wooden Table",
      variant: { size: "Medium", quantity: 2 },
      totalPrice: 1000,
    },
    {
      productName: "Wooden Chair",
      variant: { size: "Standard", quantity: 4 },
      totalPrice: 500,
    },
  ],
};


const enquiryData = order.items.map((item, index) => ({
  SlNo: index + 1,
  ProductName: item.productName,
  Variant: `${item.variant.size}`,
  Quantity: item.variant.quantity,
  TotalPrice: item.totalPrice,
  FirstName: order.address.firstName,
  LastName: order.address.lastName,
  Address: `${order.address.addressLine1}, ${
    order.address.addressLine2 || ""
  }`.trim(),
  City: order.address.city,
  State: order.address.state,
  ZipCode: order.address.zipCode,
  PaymentTerm: order.paymentTerm,
  Type: order.type,
  OrderDate: new Date(order.orderDate).toLocaleDateString(),
  TotalOrderPrice: order.price,
}));



export default function PurchaseHistory() {

  let[purchasehistory, updatePurchaseHistory] = useState([]);
  let[errormsg, updateErrorMsg] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString) => { 
    const date = new Date(dateString); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based 
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`; 
  };


  const getPurchaseHistory = async() => {

  let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/purchase-history/all`;

    try{
      await fetch(url)
     .then(response=>response.json())
     .then(data=>{
      updatePurchaseHistory(data.purchases);
     })
    }catch(error){
      updateErrorMsg("Network error. Please try later");
    }

  }

  useEffect(()=>{
    getPurchaseHistory();
  },[]);

  const rows = purchasehistory.map((purchase, index) => ({
    SerialNo : index+1,
    DateOfAdd : formatDate(purchase.dateOfAdd),
    SellerName : purchase.sellerName,
    ProductName: purchase.productName,
    Category: purchase.category,
    Subcategory : purchase.subcategory,
    Quantity : purchase.quantity,
    Units : purchase.units,
    Price : purchase.price,
    action : true,
    _id: purchase._id,
    // InvoicePrint: true,
  }));

  const filteredRows = rows.filter(row => {
    return (
      row.SellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Price.toString().includes(searchQuery) ||
      row.DateOfAdd.toString().includes(searchQuery) ||
      row.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }); 


  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 50 },
    { id: "DateOfAdd", label: "Purchased On", minWidth: 100 },
    { id: "SellerName", label: "Seller Name", minWidth: 150, align: "center" },
    { id: "ProductName", label: "Product Name", minWidth: 150, align: "center" },
    { id: "Category", label: "Category", minWidth: 150, align: "center" },
    { id: "Subcategory", label: "Subcategory", minWidth: 150, align: "center" },
    { id: "Quantity", label: "Quantity", minWidth: 150, align: "center" },
    { id: "Units", label: "Units", minWidth: 150, align: "center" },
    { id: "Price", label: "Price in Rupees", minWidth: 150, align: "center" },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
    // {
    //   id: "InvoicePrint",
    //   label: "Invoice Print",
    //   minWidth: 150,
    //   align: "center",
    // },
  ];



  const navigate = useNavigate();
  //   const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
    XLSX.writeFile(workbook, "Seller_Data.xlsx");
  };

  const handlePrintInvoice = (selectedData) => {
    // Pass the specific row data to the DownloadInvoice function
    DownloadInvoice(selectedData);
  };


  const handleEdit = (id) => {
    navigate(`/admin/editapurchasehistory/${id}`);  // Navigate to EditBuyerForm with the buyer ID
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/purchase-history/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Purchase deleted successfully") {
              Swal.fire("Deleted!", "The purchase history has been deleted.", "success");
              getPurchaseHistory();
            } else {
              Swal.fire("Error", data.message, "error");
            }
          })
          .catch((error) => Swal.fire("Error", "Failed to delete purchase", "error"));
      }
    });
  };

  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-3"> Purchase History </h2>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={2}>
                      <Button
                        sx={{ backgroundColor: "blue", color: "white" }}
                        onClick={() => navigate("/admin/addpurchasehistoryform")}
                      >
                        Add Purchase
                      </Button>
                        </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search purchases"
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
                    "& .MuiInputBase-input": { 
                      color: "black", // Ensures the typed text is visible
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
                {/* <Button
                  variant="contained"
                  style={{
                    backgroundColor: "blue",
                    height: "50px",
                    color: "white",
                  }}
                  fullWidth
                >
                  Search
                </Button> */}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
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

            <Grid item xs={12} sm={4} md={2}>
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
                // variant="contained"
                // style ={{ backgroundColor: "blue", color: "white" }}
                // style={{
                //   backgroundColor: "blue",
                //   height: "50px",
                //   color: "white",
                //   width: "100%",
                // }}
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
            <Table stickyHeader aria-label="purchase list">
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
              {/* <TableBody sx={{ backgroundColor: "#fff" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
              </TableBody> */}
              <TableBody sx={{ backgroundColor: "#fff" }}>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                            {column.id === "InvoicePrint" ? (
                              <button
                                style={{
                                  padding: "5px 10px",
                                  backgroundColor: "#22a1c3",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handlePrintInvoice(row.InvoicePrint)
                                }
                              >
                                Print Invoice
                              </button>
                            ) : column.id === "action" ? (
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
    </div>
  );
}
