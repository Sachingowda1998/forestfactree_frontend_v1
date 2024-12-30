import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const ProfileUpdateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // Handle the form submission logic here (e.g., send to API)
    console.log("Form submitted successfully", formData);
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-primary">Update Profile</h3>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ height: "48%" }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ height: "48%" }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ height: "48%" }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ height: "48%" }}
            />
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="mb-3">
          <Col xs={12}>
            <Button type="submit" variant="primary" className="w-100">
              Update Profile
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileUpdateForm;

// import React, { useState } from "react";
// import { TextField, Button, Grid, Box, Typography } from "@mui/material";

// const ProfileUpdateForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate password match
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError("");
//     // Handle the form submission logic here (e.g., send to API)
//     console.log("Form submitted successfully", formData);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Update Profile
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//               type="email"
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Confirm Password"
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           {error && (
//             <Grid item xs={12}>
//               <Typography color="error">{error}</Typography>
//             </Grid>
//           )}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ padding: "10px" }}
//             >
//               Update Profile
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default ProfileUpdateForm;
