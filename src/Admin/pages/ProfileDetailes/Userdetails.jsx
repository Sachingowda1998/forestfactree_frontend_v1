import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Row, Col, Form, Button } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  useTheme,
  Container,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

function Userdetails() {
  const theme = useTheme();
  // const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const Location = useLocation();
  const queryParams = new URLSearchParams(Location.search);
  const encodedUid = queryParams.get("uid");

  const [editorData, setEditorData] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const decode = encodedUid ? decodeURIComponent(encodedUid) : null;

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

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (decode) {
      const user = rows.find((user) => user.id === parseInt(decode));
      setUserDetails(user);
    }
  }, [decode]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allFiles = [...selectedFiles, ...files];

    // Remove duplicate files by name
    const uniqueFiles = Array.from(new Set(allFiles.map((f) => f.name))).map(
      (name) => allFiles.find((f) => f.name === name)
    );

    if (uniqueFiles.length > 5) {
      alert("You can upload a maximum of 5 files.");
      return;
    }

    setSelectedFiles(uniqueFiles);
  };

  const handleDelete = (fileName) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
  };
  return (
    <div className="container">
      <h1>Sellers Details and Product</h1>
      <Box sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="flex-end" gap="5px">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Ban Seller
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom>
          Sellers Details Section
        </Typography>

        <Paper
          sx={{ backgroundColor: "background.default" }}
          style={{ padding: "5px 5px" }}
        >
          <Box component="form">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField label="Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Location" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Status" variant="outlined" fullWidth />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} md={4} sx={{ marginTop: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="seller selled products"
                input={<OutlinedInput label="Category" />}
              >
                <MenuItem value="">john</MenuItem>
                <MenuItem value="category1">smith 1</MenuItem>
                <MenuItem value="category2">timber 1</MenuItem>
                {/* Add more options here */}
              </Select>
            </FormControl>
          </Grid>
        </Paper>
      </Box>

      <Paper
        elevation={1}
        sx={{
          padding: 2,
          marginTop: 3,
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h6" className="ant-typography mb-2">
          Basic Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                input={<OutlinedInput label="Category" />}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
                {/* Add more options here */}
              </Select>
            </FormControl>
          </Grid>

          {/* Sub-Category */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sub-Category</InputLabel>
              <Select
                label="Sub-Category"
                input={<OutlinedInput label="Sub-Category" />}
              >
                <MenuItem value="">Select Sub-Category</MenuItem>
                <MenuItem value="subcategory1">Sub-Category 1</MenuItem>
                <MenuItem value="subcategory2">Sub-Category 2</MenuItem>
                {/* Add more options here */}
              </Select>
            </FormControl>
          </Grid>

          {/* Product Type */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Product Type</InputLabel>
              <Select
                label="Product Type"
                input={<OutlinedInput label="Product Type" />}
              >
                <MenuItem value="">Select Product Type</MenuItem>
                <MenuItem value="product1">Product Type 1</MenuItem>
                <MenuItem value="product2">Product Type 2</MenuItem>
                {/* Add more options here */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <div>
        <Paper sx={{ backgroundColor: "background.default", marginTop: 3 }}>
          <Box
            sx={{
              p: 2,
              boxShadow: 1,
              borderRadius: 1,
            }}
          >
            <h6>Pricing Options</h6>

            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Weight/Volume"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Units"
                    variant="outlined"
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {/* Add your unit options here */}
                    <MenuItem value="kg">Kg</MenuItem>
                    <MenuItem value="lbs">Lbs</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            borderRadius: 2,
            backgroundColor: "background.default",
            marginTop: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product Images
          </Typography>

          <Paper
            elevation={1}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: "background.default",
              textAlign: "center",
              border: "2px dashed #ccc",
              cursor: "pointer",
            }}
            component="label"
          >
            <input
              type="file"
              accept="image/*, video/*"
              multiple
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />
            <UploadIcon sx={{ fontSize: 40, marginBottom: 2 }} />
            <Typography variant="body1">
              Drag & Drop files here, or click to select files
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Supports images (Max:5 files)
            </Typography>
          </Paper>

          {selectedFiles.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" color="textPrimary">
                Selected files:
              </Typography>

              {/* {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))} */}
              <Grid container spacing={2}>
                {selectedFiles.map((file, index) => (
                  <Grid items xs={6} sm={4} md={3} key={index}>
                    <Box sx={{ position: "relative" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(file.name)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
        <Grid container spacing={2} marginTop={1} marginBottom={1}>
          <Grid item xs={12}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                style={{ backgroundColor: "rgb(92, 135, 12)" }}
              >
                Add Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Userdetails;
