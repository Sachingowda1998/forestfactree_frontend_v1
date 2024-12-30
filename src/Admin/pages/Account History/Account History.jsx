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
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // Import jsPDF autotable plugin for tables


export default function AccountHistory() {

  let[saleshistory, updateSalesHistory] = useState([]);
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


  const getSalesHistory = async() => {

  let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/sales-history`;

    try{
      await fetch(url)
     .then(response=>response.json())
     .then(data=>{
      updateSalesHistory(data.data);
     })
    }catch(error){
      updateErrorMsg("Network error. Please try later");
    }

  }

  useEffect(()=>{
    getSalesHistory();
  },[]);

  const rows = saleshistory.map((sale, index) => ({
    SerialNo : index+1,
    OrderDate : formatDate(sale.orderDate),
    ProductId : sale.productId,
    ProductName: sale.productName,
    Weight : sale.weight,
    SellingPrice : sale.sellingPrice,
    BuyerName : sale.buyerName,
    BuyerEmail: sale.buyerEmail,
    BuyerMobileNumber : sale.buyerMobileNumber,
    BuyerAddress : sale.buyerAddress,
    ModeOfPayment : sale.modeOfPayment,
    // action : true,
    InvoicePrint: true,
  }));

  const filteredRows = rows.filter(row => {
    return (
      row.BuyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.SellingPrice.toString().includes(searchQuery) ||
      row.BuyerMobileNumber.toString().includes(searchQuery) ||
      row.BuyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.ModeOfPayment.toLowerCase().includes(searchQuery.toLowerCase())
      // row.BuyerAddress.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }); 

  const columns = [
    { id: "SerialNo", label: "Serial No", minWidth: 10 },
    { id: "OrderDate", label: "Order Date", minWidth: 150 },
    { id: "ProductName", label: "Product Name", minWidth: 200 },
    { id: "Weight", label: "Weight", minWidth: 120, align: "center" },
    { id: "SellingPrice", label: "Selling Price In Rupees", minWidth: 150, align: "center" },
    { id: "BuyerName", label: "Buyer Name", minWidth: 200 },
    { id: "BuyerEmail", label: "Buyer Email", minWidth: 150 },
    { id: "BuyerMobileNumber", label: "Buyer Mobile Number", minWidth: 150, align: "center" },
    { id: "BuyerAddress", label: "Buyer Address", minWidth: 200 },
    { id: "ModeOfPayment", label: "Mode Of Payment", minWidth: 200 },
    // { id: "action", label: "Action", minWidth: 100, align: "center" },
    {
      id: "InvoicePrint",
      label: "Print Invoice",
      minWidth: 150,
      align: "center",
    },
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

  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Seller Data");
  //   XLSX.writeFile(workbook, "Seller_Data.xlsx");
  // };

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
      const rowDate = convertDateFormat(row.OrderDate); // Replace 'date' with your actual date field name in rows
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
    XLSX.writeFile(workbook, "Sales_History.xlsx");
  
    Swal.fire({
      icon: 'success',
      title: 'Export Successful',
      text: 'The data has been exported successfully.',
      confirmButtonText: 'OK',
    });
  };
  

  // const handlePrintInvoice = (selectedData) => {
  //   // Pass the specific row data to the DownloadInvoice function
  //   DownloadInvoice(selectedData);
  // };

  const handlePrintInvoice = (selectedData) => {
      const doc = new jsPDF();
  
      // Add company logo or name at the top
    const logo = '/TimberLogo-removebg.png'; // Provide the path to the logo image file
    const logoWidth = 30; // Set the width of the logo
    const logoHeight = 30; // Set the height of the logo
    
    // Add the logo to the left of the company name
    doc.addImage(logo, 'PNG', 14, 15, logoWidth, logoHeight);
  
    // Add company name next to the logo
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Multiplex Forest Factree', 14 + logoWidth + 20, 30); // Adjusting position to the right of the logo
    
      // Add company logo or name at the top
      // doc.setFontSize(22);
      // doc.setFont('helvetica', 'bold');
      // doc.text('Multiplex Forest Factree', 14, 20);
    
      // Add invoice heading
      doc.setFontSize(18);
      doc.setFont('helvetica', 'normal');
      doc.text('Invoice', 14, 60);
      
      // Add date and invoice number
      doc.setFontSize(12);
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Invoice Date: ${selectedData.OrderDate}`, 14, 70);
      doc.text(`Invoice No: ${selectedData.SerialNo}`, 150, 70);
    
      // Add buyer details section
      doc.setFontSize(14);
      doc.text('Buyer Details:', 14, 90);
      doc.setFontSize(12);
      doc.text(`Name: ${selectedData.BuyerName}`, 14, 100);
      doc.text(`Email: ${selectedData.BuyerEmail}`, 14, 110);
      doc.text(`Mobile: ${selectedData.BuyerMobileNumber}`, 14, 120);
      doc.text(`Address: ${selectedData.BuyerAddress}`, 14, 130);
  
      doc.text('Product Details:', 14, 150);
  
      // Add table with item details
      const tableColumn = ["Description", "Value"];
      const tableData = [
        ["Product Name", selectedData.ProductName],
        ["Quantity", selectedData.Weight],
        ["Selling Price", `Rs ${selectedData.SellingPrice}`],
        ["Buyer Name", selectedData.BuyerName],
        ["Buyer Email", selectedData.BuyerEmail],
        ["Buyer Mobile", selectedData.BuyerMobileNumber],
        ["Buyer Address", selectedData.BuyerAddress],
        ["Payment Mode", selectedData.ModeOfPayment],
      ];
      
      // Adjust table styling and position
      doc.autoTable(tableColumn, tableData, {
        startY: 160,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: 'bold' },
        bodyStyles: { fontSize: 10, textColor: 50 },
        margin: { top: 2, left: 15, right: 15 }
      });
  
      //  Add product details section
      // doc.setFontSize(14);
      // doc.text('Product Details:', 14, 210);
      // doc.setFontSize(12);
      // doc.text(`Product: ${selectedData.ProductName}`, 14, 220);
      // doc.text(`Quantity: ${selectedData.Weight}`, 14, 230);
      // doc.text(`Price: Rs ${selectedData.SellingPrice}`, 14, 240);
      // doc.text(`Payment Mode: ${selectedData.ModeOfPayment}`, 14, 250);
    
      // Add footer with electronic signature notice
      doc.setFontSize(10);
      doc.text('This is an electronically generated invoice, hence no signature is required.', 14, doc.internal.pageSize.height - 50);
    
      // Add thank you note
      doc.setFontSize(12);
      doc.text('Thank you for shopping with us!', 14, doc.internal.pageSize.height - 40);
    
      // Save the PDF
      doc.save(`Invoice_${selectedData.SerialNo}.pdf`);
    };

  return (
    <div>
      <Container>
        <h2 className="text-center text-dark pt-3"> Account Summary </h2>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
                        {/* <Grid item xs={12} sm={4} md={2}>
                      <Button
                        sx={{ backgroundColor: "blue", color: "white" }}
                        onClick={() => navigate("/addasaleshistory")}
                      >
                        Add A Sale
                      </Button>
                        </Grid> */}
            <Grid item xs={12} sm={4} md={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search transactions"
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

            <Grid item xs={12} sm={3} md={3}>
        <TextField
          id="start-date"
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

      <Grid item xs={12} sm={3} md={3}>
        <TextField
          id="end-date"
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

            <Grid item xs={12} sm={2} md={2}>
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
                onClick={exportToExcel} // Attach the exportToExcel function here
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
                                  handlePrintInvoice(row)
                                }
                              >
                                Print Invoice
                              </button>
                            ) : 
      //                       column.id === "action" ? (
      //                         <>
      //                           <EditIcon
      //                             fontSize="small"
      //                             sx={{
      //                               "&:hover": {
      //                                 color: "rgba(255, 0, 0, 0.5) !important",
      //                               },
      //                             }}
      //                             // onClick={() => handleChangeConnect(row._id)}
      //                           />
      //                           <DeleteIcon
      //   fontSize="small"
      //   sx={{
      //     "&:hover": {
      //       color: "rgba(255, 0, 0, 0.5) !important", // Red on hover
      //     },
      //     color: "red",  // Set the default color to red
      //     ml: 2,  // Margin-left for spacing between Edit and Delete icons
      //   }}
      //   // onClick={() => handleDelete(row._id)}  // Delete handler
      // />
      //                         </>
      //                       ) :
                             (
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
