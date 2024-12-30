import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  Box,
  MenuItem,
} from "@mui/material";

const UserEnquiryModal = ({ open, handleClose, handleAddEnquiry }) => {
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    productName: "",
    productCategory: "",
    isActive: true,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewEnquiry((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    handleAddEnquiry(newEnquiry);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: isMobile
          ? {
              width: "90%",
              maxWidth: "400px",
              margin: "auto",
              height: "auto",
              padding: "20px",
            }
          : {
              width: "500px",
              padding: "20px",
            },
      }}
    >
      <DialogTitle>Add New Enquiry</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newEnquiry.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={newEnquiry.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Product Name"
            name="productName"
            fullWidth
            value={newEnquiry.productName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Product Category"
            name="productCategory"
            select
            fullWidth
            value={newEnquiry.productCategory}
            onChange={handleChange}
          >
            {/* Replace these with dynamic categories if available */}
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </TextField>
          <FormControlLabel
            control={
              <Switch
                checked={newEnquiry.isActive}
                onChange={handleChange}
                name="isActive"
                sx={{
                  "&. Mui-check": {
                    color: "green !important",
                  },
                  "& .Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "green !important",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "red !important",
                  },
                }}
              />
            }
            label="Active"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="AddModallbtns">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          className="AddModallbtns"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEnquiryModal;
