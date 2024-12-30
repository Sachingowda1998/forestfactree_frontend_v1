import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form } from "react-bootstrap";

const SellerFormEditProduct = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    id: 1,
    name: "John Doe",
    contact: "123-456-7890",
    slNo: "S001",
    date: "2024-11-19",
  });
  const [originalSellerDetails, setOriginalSellerDetails] = useState({
    ...sellerDetails,
  });

  const [products, setProducts] = useState([
    { sellerId: 1, image: "/assets/wood3.jpg", price: "$50", weight: "1kg" },
    { sellerId: 1, image: "/assets/wood4.jpg", price: "$70", weight: "1.5kg" },
    { sellerId: 1, image: "/assets/wood9.jpg", price: "$30", weight: "500g" },
  ]);
  const [originalProducts, setOriginalProducts] = useState([...products]);

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleImageChange = (index, file) => {
    if (file) {
      const updatedProducts = [...products];
      updatedProducts[index].image = URL.createObjectURL(file);
      setProducts(updatedProducts);
    }
  };

  const handleCancel = () => {
    setSellerDetails({ ...originalSellerDetails });
    setProducts([...originalProducts]);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalSellerDetails({ ...sellerDetails });
    setOriginalProducts([...products]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setOriginalSellerDetails({ ...sellerDetails });
    setOriginalProducts([...products]);
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
      <h2 className="text-center mb-4" style={{ color: "black" }}>
        Seller Profile
      </h2>
      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex align-items-center">
          <div className="me-4">
            <img
              src="/assets/TimberLogo.jpg"
              alt="Seller"
              className="rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div>
            {isEditing ? (
              <>
                <Form.Control
                  type="text"
                  name="name"
                  value={sellerDetails.name}
                  onChange={handleSellerChange}
                  className="mb-2"
                  placeholder="Name"
                />
                <Form.Control
                  type="text"
                  name="contact"
                  value={sellerDetails.contact}
                  onChange={handleSellerChange}
                  className="mb-2"
                  placeholder="Contact"
                />
                <Form.Control
                  type="text"
                  name="slNo"
                  value={sellerDetails.slNo}
                  onChange={handleSellerChange}
                  className="mb-2"
                  placeholder="Serial No"
                />
                <Form.Control
                  type="date"
                  name="date"
                  value={sellerDetails.date}
                  onChange={handleSellerChange}
                  className="mb-2"
                />
              </>
            ) : (
              <>
                <h5 className="mb-2">Name: {sellerDetails.name}</h5>
                <p className="mb-1">
                  <strong>Contact:</strong> {sellerDetails.contact}
                </p>
                <p className="mb-1">
                  <strong>Serial No:</strong> {sellerDetails.slNo}
                </p>
                <p className="mb-0">
                  <strong>Date:</strong> {sellerDetails.date}
                </p>
              </>
            )}
            <Row className="g-2 mt-2">
              {isEditing ? (
                <>
                  <Col>
                    <Button variant="primary" onClick={handleSave}>
                      Save
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Col>
                </>
              ) : (
                <Col>
                  <Button variant="success" onClick={handleEdit}>
                    Edit
                  </Button>
                </Col>
              )}
              {/* <Col>
                <Button variant="danger">Delete</Button>
              </Col> */}
            </Row>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-4" style={{ color: "black" }}>
        Seller Products Images
      </h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={`Product ${index + 1}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                {isEditing ? (
                  <>
                    <Form.Group className="mb-2">
                      <Form.Label>Update Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(index, e.target.files[0])
                        }
                      />
                    </Form.Group>
                    {/* <Form.Control
                      type="text"
                      value={product.price}
                      onChange={(e) =>
                        handleProductChange(index, "price", e.target.value)
                      }
                      className="mb-2"
                      placeholder="Price"
                    />
                    <Form.Control
                      type="text"
                      value={product.weight}
                      onChange={(e) =>
                        handleProductChange(index, "weight", e.target.value)
                      }
                      placeholder="Weight"
                    /> */}
                  </>
                ) : (
                  <>
                    {/* <h5 className="card-title">Price333: {product.price}</h5>
                    <p className="card-text">Weight333: {product.weight}</p> */}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerFormEditProduct;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Row, Col, Button, Form } from "react-bootstrap";

// const SellerFormEditProduct = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [sellerDetails, setSellerDetails] = useState({
//     id: 1,
//     name: "John Doe",
//     contact: "123-456-7890",
//     slNo: "S001",
//     date: "2024-11-19",
//   });
//   const [originalSellerDetails, setOriginalSellerDetails] = useState({
//     ...sellerDetails,
//   });

//   const [products, setProducts] = useState([
//     { sellerId: 1, image: "/assets/wood3.jpg", price: "$50", weight: "1kg" },
//     { sellerId: 1, image: "/assets/wood4.jpg", price: "$70", weight: "1.5kg" },
//     { sellerId: 1, image: "/assets/wood9.jpg", price: "$30", weight: "500g" },
//   ]);
//   const [originalProducts, setOriginalProducts] = useState([...products]);

//   const handleSellerChange = (e) => {
//     const { name, value } = e.target;
//     setSellerDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProductChange = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleCancel = () => {
//     setSellerDetails({ ...originalSellerDetails });
//     setProducts([...originalProducts]);
//     setIsEditing(false);
//   };

//   const handleEdit = () => {
//     setOriginalSellerDetails({ ...sellerDetails });
//     setOriginalProducts([...products]);
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setOriginalSellerDetails({ ...sellerDetails });
//     setOriginalProducts([...products]);
//     setIsEditing(false);
//   };

//   return (
//     <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
//       <h2 className="text-center mb-4" style={{ color: "black" }}>
//         Seller Profile
//       </h2>
//       <div className="card p-4 shadow-sm mb-4">
//         <div className="d-flex align-items-center">
//           <div className="me-4">
//             <img
//               src="/assets/TimberLogo.jpg"
//               alt="Seller"
//               className="rounded-circle"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </div>
//           <div>
//             {isEditing ? (
//               <>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={sellerDetails.name}
//                   onChange={handleSellerChange}
//                   className="mb-2"
//                   placeholder="Name"
//                 />
//                 <Form.Control
//                   type="text"
//                   name="contact"
//                   value={sellerDetails.contact}
//                   onChange={handleSellerChange}
//                   className="mb-2"
//                   placeholder="Contact"
//                 />
//                 <Form.Control
//                   type="text"
//                   name="slNo"
//                   value={sellerDetails.slNo}
//                   onChange={handleSellerChange}
//                   className="mb-2"
//                   placeholder="Serial No"
//                 />
//                 <Form.Control
//                   type="date"
//                   name="date"
//                   value={sellerDetails.date}
//                   onChange={handleSellerChange}
//                   className="mb-2"
//                 />
//               </>
//             ) : (
//               <>
//                 <h5 className="mb-2">Name: {sellerDetails.name}</h5>
//                 <p className="mb-1">
//                   <strong>Contact:</strong> {sellerDetails.contact}
//                 </p>
//                 <p className="mb-1">
//                   <strong>Serial No:</strong> {sellerDetails.slNo}
//                 </p>
//                 <p className="mb-0">
//                   <strong>Date:</strong> {sellerDetails.date}
//                 </p>
//               </>
//             )}
//             <Row className="g-2 mt-2">
//               {isEditing ? (
//                 <>
//                   <Col>
//                     <Button variant="primary" onClick={handleSave}>
//                       Save
//                     </Button>
//                   </Col>
//                   <Col>
//                     <Button variant="secondary" onClick={handleCancel}>
//                       Cancel
//                     </Button>
//                   </Col>
//                 </>
//               ) : (
//                 <Col>
//                   <Button variant="success" onClick={handleEdit}>
//                     Edit
//                   </Button>
//                 </Col>
//               )}
//               <Col>
//                 <Button variant="danger">Delete</Button>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>

//       <h2 className="text-center mb-4" style={{ color: "black" }}>
//         Seller Products Images
//       </h2>
//       <div className="row">
//         {products.map((product, index) => (
//           <div key={index} className="col-md-4 col-sm-6 mb-4">
//             <div className="card shadow-sm h-100">
//               <img
//                 src={product.image}
//                 className="card-img-top"
//                 alt={`Product ${index + 1}`}
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 {isEditing ? (
//                   <>
//                     <Form.Control
//                       type="text"
//                       value={product.price}
//                       onChange={(e) =>
//                         handleProductChange(index, "price", e.target.value)
//                       }
//                       className="mb-2"
//                       placeholder="Price"
//                     />
//                     <Form.Control
//                       type="text"
//                       value={product.weight}
//                       onChange={(e) =>
//                         handleProductChange(index, "weight", e.target.value)
//                       }
//                       placeholder="Weight"
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <h5 className="card-title">Price: {product.price}</h5>
//                     <p className="card-text">Weight: {product.weight}</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SellerFormEditProduct;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Row, Col, Button } from "react-bootstrap";

// const SellerFormEditProduct = () => {
//   // Dummy data for sellers and products
//   const sellers = [
//     {
//       id: 1,
//       name: "John Doe",
//       contact: "123-456-7890",
//       slNo: "S001",
//       date: "2024-11-19",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       contact: "987-654-3210",
//       slNo: "S002",
//       date: "2024-11-18",
//     },
//     {
//       id: 3,
//       name: "Alice Johnson",
//       contact: "555-123-4567",
//       slNo: "S003",
//       date: "2024-11-17",
//     },
//   ];

//   const products = [
//     {
//       sellerId: 1,
//       image: "/assets/wood3.jpg",
//       price: "$50",
//       weight: "1kg",
//     },
//     {
//       sellerId: 1,
//       image: "/assets/wood4.jpg",
//       price: "$70",
//       weight: "1.5kg",
//     },
//     {
//       sellerId: 1,
//       image: "/assets/wood9.jpg",
//       price: "$30",
//       weight: "500g",
//     },
//     {
//       sellerId: 3,
//       image: "/assets/wood3.jpg",
//       price: "$40",
//       weight: "700g",
//     },
//     {
//       sellerId: 1,
//       image: "/assets/wood12.jpg",
//       price: "$60",
//       weight: "1.2kg",
//     },
//   ];

//   // Specify the seller ID to display
//   const selectedSellerId = 1;

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedSeller, setEditedSeller] = useState(selectedSeller);
//   const [editedProducts, setEditedProducts] = useState(selectedProducts);

//   const selectedSeller = sellers.find(
//     (seller) => seller.id === selectedSellerId
//   );
//   const selectedProducts = products.filter(
//     (product) => product.sellerId === selectedSellerId
//   );

//   const handleSellerChange = (e) => {
//     const { name, value } = e.target;
//     setEditedSeller((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleProductChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedProducts = [...editedProducts];
//     updatedProducts[index] = {
//       ...updatedProducts[index],
//       [name]: value,
//     };
//     setEditedProducts(updatedProducts);
//   };

//   const handleSave = () => {
//     // In a real application, you'd send the data to the backend
//     setIsEditing(false);
//   };

//   return (
//     <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
//       <h2 className="text-center mb-4" style={{ color: "black" }}>
//         Seller Profile
//       </h2>

//       {selectedSeller ? (
//         <div className="card p-4 shadow-sm mb-4">
//           <div className="d-flex align-items-center">
//             <div className="me-4">
//               <img
//                 src="/assets/TimberLogo.jpg"
//                 alt="Seller"
//                 className="rounded-circle"
//                 style={{ width: "100px", height: "100px" }}
//               />
//             </div>
//             <div>
//               <h5 className="mb-2">Name: {selectedSeller.name}</h5>
//               <p className="mb-1">
//                 <strong>Contact:</strong> {selectedSeller.contact}
//               </p>
//               <p className="mb-1">
//                 <strong>Serial No:</strong> {selectedSeller.slNo}
//               </p>
//               <p className="mb-0">
//                 <strong>Date:</strong> {selectedSeller.date}
//               </p>
//               <Row className="g-2">
//                 <Col>
//                   <Button variant="success" className="btn-custom-width">
//                     Edit
//                   </Button>
//                 </Col>
//                 <Col>
//                   <Button variant="danger" className="btn-custom-width">
//                     Delete
//                   </Button>
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-danger">
//           No seller found with the specified ID.
//         </p>
//       )}

//       <h2 className="text-center mb-4" style={{ color: "black" }}>
//         Seller Products Images
//       </h2>
//       <div className="row">
//         {selectedProducts.length > 0 ? (
//           selectedProducts.map((product, index) => (
//             <div key={index} className="col-md-4 col-sm-6 mb-4">
//               <div className="card shadow-sm h-100">
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={`Product ${index + 1}`}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Price: {product.price}</h5>
//                   <p className="card-text">Weight: {product.weight}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-danger">
//             No products available for this seller.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerFormEditProduct;
