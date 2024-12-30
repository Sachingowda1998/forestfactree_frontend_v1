import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { useEffect } from 'react';

const AddSubcategory = () => {
  const [sname, setSname] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const navigate = useNavigate();


  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/forestfactree/categories`
        );
        const data = await response.json();

        if (response.ok) {
          setCategories(data); // Set categories if the response is OK
        } else {
          swal.fire("Error", "Failed to fetch categories", "error");
        }
      } catch (error) {
        swal.fire("Error", "An error occurred while fetching categories", "error");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/forestfactree/subcategories/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sname, categoryName }),
    });

    const data = await response.json();

    if (response.ok) {
      swal.fire('Success', 'Subcategory added successfully', 'success');
      navigate('/admin/subcategory'); // Redirect to subcategories list
    } else {
      swal.fire('Error', data.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="container text-dark">
      <h2 className='text-center mt-3 mb-3'>Add Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label>Subcategory Name</label>
          <input
            type="text"
            className="form-control"
            value={sname}
            onChange={(e) => setSname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label>Category Name</label>
          <select
            className="form-select"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Subcategory</button>
      </form>
    </div>
  );
};

export default AddSubcategory;
