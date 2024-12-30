import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const handleDelete = () => {
    // Implement the delete logic here
    console.log("Product deleted");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Product Details
      </Typography>
      <form>
        <Grid container spacing={2}>
          {/* Product ID */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product ID"
              variant="outlined"
              fullWidth
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </Grid>

          {/* Product Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>

          {/* Stock */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>

          {/* Product Images */}
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                label={`Image ${index + 1}`}
                variant="outlined"
                fullWidth
                value={image}
                onChange={(e) => handleImageChange(index, e)}
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}

          {/* Product Description */}
          <Grid item xs={12}>
            <TextField
              label="Product Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          {/* Category and Sub-Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="Category 1">Category 1</MenuItem>
                <MenuItem value="Category 2">Category 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Sub-Category</InputLabel>
              <Select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                label="Sub-Category"
              >
                <MenuItem value="Sub-Category 1">Sub-Category 1</MenuItem>
                <MenuItem value="Sub-Category 2">Sub-Category 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Added Product Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Added Date"
              variant="outlined"
              type="date"
              fullWidth
              value={addedDate}
              onChange={(e) => setAddedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Hide/Show Product */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVisible}
                  onChange={() => setIsVisible(!isVisible)}
                  sx={{
                    color: "green", // Border color when unchecked
                    "&.Mui-checked": {
                      color: "green", // Checkmark and border color when checked
                    },
                  }}
                />
              }
              label="Hide Product"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
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
        </Grid>
      </form>
    </Box>
  );
};

export default ProductDetails;
