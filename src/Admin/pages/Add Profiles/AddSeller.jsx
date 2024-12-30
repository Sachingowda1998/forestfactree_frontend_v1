import React, { useState } from "react";
import { Box, TextField, Button, Grid, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const AddSeller = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sellerData, setSellerData] = useState({
    id: "",
    name: "",
    phoneNo: "",
    date: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerData({
      ...sellerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as saving the data
    console.log(sellerData);
  };

  return (
    <Container>
      <h2>Add New Seller</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="id"
              value={sellerData.id}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="name"
              value={sellerData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternative-Phone No."
              variant="outlined"
              name="phoneNo"
              value={sellerData.phoneNo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              variant="outlined"
              name="date"
              value={sellerData.date}
              onChange={handleInputChange}
              required
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="India"
              variant="outlined"
              name="state"
              value={sellerData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={sellerData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              name="state"
              value={sellerData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Addresss with pincode"
              variant="outlined"
              name="state"
              value={sellerData.state}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddSeller;
