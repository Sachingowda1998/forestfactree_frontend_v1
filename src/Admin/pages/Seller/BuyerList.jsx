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
import DeleteIcon from '@mui/icons-material/Delete';  // Import the DeleteIcon
import allurls from "../../allurls";
import { useState, useEffect } from "react";
import { MenuItem, Select } from '@mui/material'; 
import Swal from 'sweetalert2'; // Add this import for SweetAlert

import * as XLSX from "xlsx";



export default function BuyerList() {

  let[buyers, updateBuyers] = useState([]);
  let[errormsg, updateErrorMsg] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString) => { 
    const date = new Date(dateString); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based 
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`; 
  };

  const getBuyers = async() => {

    let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyers/all`;
  
    try{
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      updateBuyers(data)
    })
    }catch(error){
      updateErrorMsg("Network Error. Please Try Later");
    }
  }

  const rows = buyers.map((buyer, index) => ({
    SerialNo: index+1,
    EnquiryDate: formatDate(buyer.dateOfAdding),
    Name: buyer.name,
    Email: buyer.email,
    MobileNumber: buyer.mobileNumber,
    AlternateMobileNumber: buyer.alternateMobileNumber,
    MillAddress: buyer.millAddress,
    BuyerType: buyer.buyerType,
    GstNumber: buyer.gstNumber,
    PanNumber: buyer.panNumber,
    AdditionalDetails: buyer.additionalDetails,
    _id: buyer._id,
    action: true,
  }));

  const filteredRows = rows.filter(row => {
    return (
      row.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.MobileNumber.toString().includes(searchQuery) ||
      row.AlternateMobileNumber.toString().includes(searchQuery) ||
      row.MillAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.GstNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.PanNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }); 


  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 10 },
    { id: "EnquiryDate", label: "Enquiry Date", minWidth: 150 },
    { id: "Name", label: "Name", minWidth: 200 },
    { id: "Email", label: "Email", minWidth: 150 },
    { id: "MobileNumber", label: "Mobile", minWidth: 150, align: "center" },
    { id: "AlternateMobileNumber", label: "Alternate Mobile Number", minWidth: 150, align: "center" },
    { id: "MillAddress", label: "Mill Address", minWidth: 300, align: "left" },
    { id: "BuyerType", label: "Buyer Type", minWidth: 120, align: "center" },
    { id: "GstNumber", label: "GST Number", minWidth: 120, align: "center" },
    { id: "PanNumber", label: "PAN Number", minWidth: 120, align: "center" },
    {
      id: "AdditionalDetails",
      label: "Additional Details",
      minWidth: 300,
      align: "left",
    },
    { id: "action", label: "Action", minWidth: 100, align: "center" },
  ];
  
  
  const theme = useTheme();
  const navigate = useNavigate();
  //   const colors = tokens(theme.palette.mode);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  useEffect(()=>{
    getBuyers();
  },[]);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeConnect = (id) => {
    console.log(id);
    navigate(`/admin/editbuyerform/${id}`);  // Navigate to EditBuyerForm with the buyer ID
  };

// Function to handle deleting a buyer using fetch
const handleDelete = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyers/delete/${id}`, {
      method: 'DELETE',  // HTTP method to delete
      headers: {
        'Content-Type': 'application/json',  // Ensuring the content type is JSON
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete buyer');
    }

    // Show success message using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Buyer deleted successfully',
      text: 'The buyer has been removed from the database.',
    });

    getBuyers();

    // Optionally, you can refresh or update the list of buyers here
    // Update the state or UI here
  } catch (error) {
    console.error("Error deleting buyer:", error);

    // Show error message using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Failed to delete buyer',
      text: error.message || 'There was an issue deleting the buyer.',
    });
  }
};

  

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
    XLSX.writeFile(workbook, "Seller_Data.xlsx");
  };

  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-3"> List Of Buyers </h2>
        {/* <Box display="flex" justifyContent="flex-end">

        </Box> */}

        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">

            <Grid item xs={12} sm={4} md={2}>
            <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={() => navigate("/admin/addbuyerform")}
          >
            Add Buyer
            </Button>
            </Grid>


            {/* Search Field and Button */}
            <Grid item xs={12} sm={8} md={10}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search buyers"
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
                {/* <Button
                  variant="contained"
                  // sx={{
                  //   backgroundColor: "blue",
                  //   height: "50px",
                  //   color: "white",
                  // }}
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



            {/* Start Date Field */}
            {/* <Grid item xs={12} sm={4} md={3}>
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
            </Grid> */}

            {/* End Date Field */}
            {/* <Grid item xs={12} sm={4} md={3}>
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
            </Grid> */}

            {/* Export to Excel Button */}
            {/* <Grid item xs={12} sm={4} md={2}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "blue",
                  height: "50px",
                  color: "white",
                }}
                startIcon={<FileCopyIcon />}
                fullWidth
              >
                Export to Excel
              </Button>
            </Grid> */}
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
          {/* <TablePagination
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
          /> */}
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
