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
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const AddSubCategoryModal = ({
  open,
  handleClose,
  handleAddCategory,
  categories,
}) => {
  const [newCategory, setNewCategory] = useState({
    category: "",
    subCategoryName: "",

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
      <DialogTitle>Add New Sub-Category</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px">
          {/* Dropdown for Category */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={newCategory.category}
              label="Category"
              onChange={handleChange}
              name="category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.category}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sub-Category Name Input */}
          <TextField
            margin="dense"
            label="Sub Category Name"
            name="subCategoryName"
            fullWidth
            value={newCategory.subCategoryName}
            onChange={handleChange}
          />

          {/* Active Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={newCategory.isActive}
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

export default AddSubCategoryModal;
