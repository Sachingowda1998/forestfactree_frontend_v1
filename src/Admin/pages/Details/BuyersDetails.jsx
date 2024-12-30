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

function BuyersDetails() {
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

  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   if (files.length) {
  //     setSelectedFiles(files);
  //   }
  // };

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
      <Box sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="flex-end" gap="5px">
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Delete User
          </Button> */}
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Ban User
          </Button>
        </Box>
        {/* <Typography variant="h4" gutterBottom>
          User Details
        </Typography> */}
        {/* 
        <Paper sx={{ backgroundColor: "background.default" }}>
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
        </Paper> */}
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
            <Grid item xs={12} md={6}>
              <TextField
                label="ALternative PhoneNo."
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Whatsapp NO."
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleDelete}
          sx={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "red",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Delete
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          //   onClick={handleSave}
          sx={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#3f51b5",
            "&:hover": { backgroundColor: "#303f9f" },
          }}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
}

export default BuyersDetails;
