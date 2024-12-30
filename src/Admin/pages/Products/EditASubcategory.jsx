import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

const EditSubcategory = () => {
  const [sname, setSname] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubcategory = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/subcategories/${id}`);
      const data = await response.json();

      if (response.ok) {
        setSname(data.sname);
        setCategoryName(data.categoryName);
      } else {
        swal.fire('Error', data.message || 'Something went wrong', 'error');
      }
    };

    fetchSubcategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let subcategoryId = id;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/subcategories/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subcategoryId, sname, categoryName }),
    });

    const data = await response.json();

    if (response.ok) {
      swal.fire('Success', 'Subcategory updated successfully', 'success');
      navigate('/admin/subcategory');
    } else {
      swal.fire('Error', data.message || 'Something went wrong', 'error');
    }
  };

  return (
    <div className="container text-dark">
      <h2 className='text-center mt-3 mb-3'>Edit Subcategory</h2>
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
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Subcategory</button>
      </form>
    </div>
  );
};

export default EditSubcategory;
