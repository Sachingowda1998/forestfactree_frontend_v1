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
} from "@mui/material";

const AddCategoryModal = ({ open, handleClose, handleAddCategory }) => {
  const [newCategory, setNewCategory] = useState({
    category: "",

    isActive: true,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    handleAddCategory(newCategory);
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
              width: "90%", // Set modal width to 90% on mobile
              maxWidth: "400px", // Maximum width for consistency
              margin: "auto", // Center horizontally
              height: "auto", // Adjust height to content
              padding: "20px", // Optional padding for spacing
            }
          : {
              width: "500px", // Default width on larger screens
              padding: "20px",
            },
      }}
    >
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            margin="dense"
            label="Category Name"
            name="category"
            fullWidth
            value={newCategory.category}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={newCategory.isActive}
                onChange={handleChange}
                name="isActive"
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

export default AddCategoryModal;
