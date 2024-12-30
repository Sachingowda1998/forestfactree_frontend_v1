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

const AddBannerModel = ({ open, handleClose, handleAddCategory }) => {
  const [newCategory, setNewCategory] = useState({
    category: "",
    categoryImage: "",
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCategory((prev) => ({
        ...prev,
        categoryImage: file, // Store the selected image file in the state
      }));
    }
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
          {/* File input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "16px" }}
          />
          {/* Optional: Display selected image preview */}
          {newCategory.categoryImage && (
            <img
              src={URL.createObjectURL(newCategory.categoryImage)}
              alt="Selected preview"
              style={{ maxWidth: "100%", marginTop: "8px" }}
            />
          )}
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

export default AddBannerModel;
