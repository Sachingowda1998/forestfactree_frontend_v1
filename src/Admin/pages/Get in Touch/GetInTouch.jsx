import React from "react";
import dayjs from "dayjs";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Container,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as XLSX from "xlsx";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import allurls from "../../allurls";
import { MenuItem, Select } from '@mui/material'; 
import Swal from 'sweetalert2'; // Add this import for SweetAlert
import DeleteIcon from '@mui/icons-material/Delete';  // Import the DeleteIcon
import { Button } from "react-bootstrap";

import FileCopyIcon from "@mui/icons-material/FileCopy";
// import { DatePicker } from "@mui/material";


export default function GetInTouch() {

  let[contactusenquiries, updateContactUsEnquiries] = useState([]);
  let[errormsg, updateErrorMsg] = useState("");

        const [startingDate, setStartingDate] = useState("");
        const [endingDate, setEndingDate] = useState("");
  

  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString) => { 
    const date = new Date(dateString); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based 
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`; 
  };

  const getContactUsEnquiries = async() => {

    let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/contact-us/all`;
  
    try{
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      updateContactUsEnquiries(data)
    })
    }catch(error){
      updateErrorMsg("Network Error. Please Try Later");
    }
    }

    useEffect(()=>{
      getContactUsEnquiries();
    },[]);
  
    useEffect(() => {
      setPage(0);
    }, [searchQuery]);

    const rows = contactusenquiries.map((enquiry, index) => ({
      SerialNo: index + 1,
      EnquiryDate: formatDate(enquiry.dateOfContact),
      Name: enquiry.name,
      Email: enquiry.email,
      Mobile: enquiry.mobileNumber,
      UserType : enquiry.userType,
      Description: enquiry.enquiryDescription,
      EnquiryStatus: enquiry.enquiryStatus,
      _id: enquiry._id,
      action: true,
    }));

    const filteredRows = rows.filter(row => {
      return (
        row.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.Mobile.toString().includes(searchQuery) ||
        row.EnquiryDate.toString().includes(searchQuery) ||
        row.UserType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.Description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }); 


  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 10 },
    { id: "EnquiryDate", label: "Enquiry Date", minWidth: 150 },
    { id: "Name", label: "Name", minWidth: 200 },
    { id: "Email", label: "Email", minWidth: 150 },
    { id: "Mobile", label: "Mobile", minWidth: 150, align: "center" },
    { id: "UserType", label: "User Type", minWidth: 120, align: "center" },
    {
      id: "Description",
      label: "Description",
      minWidth: 300,
      align: "left",
    },
    {
      id: "EnquiryStatus",
      label: "EnquiryStatus",
      minWidth: 100,
      align: "center",
    },
    { id: "action", label: "Delete", minWidth: 100, align: "left" },
  ];
  
  
  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
  //   XLSX.writeFile(workbook, "Seller_Data.xlsx");
  // };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    // Logic for editing can be added here
    console.log("Editing entry with ID:", id);
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleExport = () => {
    console.log("Exporting to Excel...");
  };


  const handleStatusChange = async (id, newValue) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/contact-us/update/${id}`;

    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enquiryStatus: newValue })
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      Swal.fire({ 
        title: 'Success!', 
        text: 'The status has been updated.', 
        icon: 'success', 
        confirmButtonText: 'OK' 
      });
  
      // Optionally refresh the enquiries to reflect the updated status
      getContactUsEnquiries();
  
    } catch (error) {
      Swal.fire({ 
        title: 'Error!', 
        text: 'There was an issue updating the status. Please try again later.', 
        icon: 'error', 
        confirmButtonText: 'OK' 
      });
    }
  };


  const deleteEnquiry = async (enquiryId) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/contact-us/delete/${enquiryId}`, {
            method: 'DELETE',
          });
      
          const data = await response.json();
      
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: data.message || 'Enquiry deleted successfully!',
            });
            getContactUsEnquiries();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message || 'Failed to delete enquiry.',
            });
          }
        } catch (error) {
          console.error('Error deleting enquiry:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete enquiry. Please try again later.',
          });
        }
      };


  const convertDateFormat = (dateStr) => {
    // Split the DD-MM-YYYY string
    const [day, month, year] = dateStr.split("-").map(Number);
    
    // Create a Date object with the format (year, month - 1, day)
    const date = new Date(year, month - 1, day); // month is zero-based
    
    // Convert the Date object to a string in the desired format
    return date.toString();  // Outputs: "Wed Jun 15 1932 00:00:00 GMT+0530 (India Standard Time)"
  };


  const exportToExcel = () => {
          if (!startingDate || !endingDate) {
            Swal.fire({
              icon: 'warning',
              title: 'Missing Dates',
              text: 'Please select both a starting and ending date.',
              confirmButtonText: 'OK',
            });
            return;
          }
        
          // Parse starting and ending dates
          const start = new Date(startingDate);
          const end = new Date(endingDate);
      
            // Adjust time to start of day for accurate comparison (midnight)
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
      
          // const start = formatDate(startingDate);
          // const end = formatDate(endingDate);
      
          console.log(start);
          console.log(end);
        
          // Filter rows based on date range
          const filteredRows = rows.filter((row) => {
            const rowDate = convertDateFormat(row.EnquiryDate); // Replace 'date' with your actual date field name in rows
            const newRowDate = new Date(rowDate);    
            // Normalize rowDate to midnight for accurate comparison
                newRowDate.setHours(0, 0, 0, 0);
            
            // console.log(rowDate);
            // return rowDate >= start && rowDate <= end;
            console.log('Row Date:', newRowDate); // Log row date
      
            // Compare dates
            const isWithinRange = newRowDate >= start && newRowDate <= end;
            console.log('Is row within range:', isWithinRange); // Log the result of the comparison
        
            return isWithinRange;
          });
        
          if (filteredRows.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No Data Found',
              text: 'No data is available in the selected date range.',
              confirmButtonText: 'OK',
            });
            return;
          }
        
          // Convert filtered rows to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(filteredRows);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");
        
          // Export workbook to Excel file
          XLSX.writeFile(workbook, "ContactUs_Enquiries.xlsx");
        
          Swal.fire({
            icon: 'success',
            title: 'Export Successful',
            text: 'The data has been exported successfully.',
            confirmButtonText: 'OK',
          });
        };



  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-3"> Contact Us Enquiries </h2>

        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            {/* Search Field and Button */}
            <Grid item xs={12} sm={4} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search enquiries"
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
                  Search2
                </Button> */}
              </Stack>
            </Grid>

            {/* Start Date Field */}
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="Start Date"
                value={startingDate}
                onChange={(e) => setStartingDate(e.target.value)}
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

            {/* End Date Field */}
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="End Date"
                value={endingDate}
                onChange={(e) => setEndingDate(e.target.value)}
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

            {/* Export to Excel Button */}
            <Grid item xs={12} sm={2} md={2}>
            <Button
                variant="contained"
                style={{
                  backgroundColor: "blue",
                  height: "50px",
                  color: "white",
                }}
                startIcon={<FileCopyIcon />}
                onClick={exportToExcel} // Attach the exportToExcel function here
                fullWidth
              >
                Export to Excel
              </Button>
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
                      align="left"
                      style={{
                        minWidth: column.minWidth,
                        fontSize: "18px",
                        backgroundColor: "#a9a9a9",
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.slNo}
                    >
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
                              <DeleteIcon
        fontSize="small"
        sx={{
          "&:hover": {
            color: "rgba(255, 0, 0, 0.5) !important", // Red on hover
          },
          color: "red",  // Set the default color to red
          ml: 2,  // Margin-left for spacing between Edit and Delete icons
        }}
        onClick={() => deleteEnquiry(row._id)}  // Delete handler
      />
                            ) : column.id === "EnquiryStatus" ? (
                            <Select
                              value={row.EnquiryStatus} // Set the default value from the data
                              onChange={(e) => {
                                const newValue = e.target.value;
                                // Call your update function here and show the SweetAlert
                                handleStatusChange(row._id, newValue);
                              }}
                              sx={{
                                backgroundColor: "#f0f0f0", // Light background for the dropdown
                                borderRadius: "8px",         // Rounded corners
                                width: "100%",               // Full width for consistency
                                fontSize: "16px",            // Larger font size for readability
                                color: "black",              // Text color
                                "& .MuiSelect-icon": {       // Custom style for the dropdown arrow
                                  color: "#00796b",          // Green color for the arrow
                                },
                                "&:hover": {
                                  backgroundColor: "#e0e0e0", // Light grey background on hover
                                },
                                "&.Mui-focused": {
                                  borderColor: "#00796b",    // Focus border color
                                },
                              }}
                            >
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Responded">Responded</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
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
            rowsPerPageOptions={[5, 10, 25]}
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
