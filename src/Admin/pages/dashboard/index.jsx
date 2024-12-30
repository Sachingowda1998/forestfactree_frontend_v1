import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockSellersReq } from "../../data/mockData";

import EmailIcon from "@mui/icons-material/Email";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import ListAltIcon from "@mui/icons-material/ListAlt";

import Header from "../../components/Header";

import StatBox from "../../components/StatBox";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  let[number, updateNumber] = useState(1);

  let[errormsg, updateErrorMsg] = useState("");

  let[buyerenquiries, updateBuyerEnquiries] = useState([]);
  let[sellerenquiries, updateSellerEnquiries] = useState([]);
    let[contactusenquiries, updateContactUsEnquiries] = useState([]);
    let [products, setProducts] = useState([]);

    useEffect(() => {
      // Fetch product names from the backend
      fetch(`${process.env.REACT_APP_BACKEND_URL}/forestfactree/products/names`)
        .then((response) => response.json())
        .then((data) => setProducts(data.products))
        .catch((error) => console.error("Error fetching product names:", error));
  
    }, []);

  const getBuyerEnquiries = async() => {

    let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/buyer-enquiries/all`;
  
    try{
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      updateBuyerEnquiries(data)
    })
    }catch(error){
      updateErrorMsg("Network Error. Please Try Later");
    }
    }

    const getSellerEnquiries = async() => {

      let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/seller-enquiries/all`;
    
      try{
      await fetch(url)
      .then(response=>response.json())
      .then(data=>{
        updateSellerEnquiries(data)
      })
      }catch(error){
        updateErrorMsg("Network Error. Please Try Later");
      }
      }

      const getContactUsEnquiries = async() => {

        let url = `${process.env.REACT_APP_BACKEND_URL}/forestfactree/contact-us/all`;
      
        try{
        await fetch(url)
        .then(response=>response.json())
        .then(data=>{
          updateContactUsEnquiries(data)
        })
        }catch(error){
          updateErrorMsg("Network Error. Please Try Later");
        }
        }


  useEffect(()=>{
    getBuyerEnquiries();
    getSellerEnquiries();
    getContactUsEnquiries();
  },[]);

  const display1 = buyerenquiries.length;
  const display2 = products.length; 
  const display3 = sellerenquiries.length;
  const display4 = contactusenquiries.length;

  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Link to="/admin/productenquiryfrombuyers" style={{ textDecoration: "none" }}>
            <Box
              width="100%"
              backgroundColor="#141b2d"
              // backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={display1}
                subtitle="Total Buyer Enquiries"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Grid>

        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
        <Link to="/timberlistingtable" style={{ textDecoration: "none" }}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Total Products"
              // progress="0.50"
              // increase="+21%"
              icon={
                <ShoppingCartIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          </ Link >
        </Grid> */}
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Link to="/admin/productobjects" style={{ textDecoration: "none" }}>
            <Box
              width="100%"
              backgroundColor="#141b2d"
              // backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={display2}
                subtitle="Total Products"
                icon={
                  <ShoppingCartIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Link to="/admin/sellerrequest" style={{ textDecoration: "none" }}>
            <Box
              width="100%"
              backgroundColor="#141b2d"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={display3}
                subtitle="Total Seller Enquiries"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Link
            to="/admin/getintouch"
            style={{ textDecoration: "none" }}
          >
            <Box
              width="100%"
              backgroundColor="#141b2d"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={display4}
                subtitle="Contact Us Enquiries"
                icon={
                  <ListAltIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Grid>
      </Grid>

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Total Sellers requested"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid> */}
        {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Total Approved Sellers"
              icon={
                <ShoppingCartIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid> */}
      </Grid>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor="#141b2d"
            // backgroundColor={colors.primary[400]}
            height="280px"
            maxHeight="280px"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
              position="sticky"
              top="0"
              backgroundColor={colors.primary[400]}
              zIndex="1"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Buyer Enquiries
              </Typography>
            </Box>
            {buyerenquiries.map((enquiry, i) => {
              return (
                <Box
                  // key={`${reqSellersPara}-${i}`}
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[100]}
                    >
                      {enquiry.buyerEmail}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {enquiry.buyerName}
                    </Typography>
                  </Box>
                  {/* <Box color={colors.grey[100]}>enquiry.enquiryDate}</Box> */}
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {enquiry.buyerPhoneNumber}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            // backgroundColor={colors.primary[400]}
            backgroundColor="#141b2d"
            height="280px"
            maxHeight="280px"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
              position="sticky"
              top="0"
              backgroundColor={colors.primary[400]}
              zIndex="1"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Seller Enquiries
              </Typography>
            </Box>
            {sellerenquiries.map((enquiry, i) => {
              return (
                <Box
                  // key={`${reqSellersPara}-${i}`}
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[100]}
                    >
                      {enquiry.email}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {enquiry.name}
                    </Typography>
                  </Box>
                  {/* <Box color={colors.grey[100]}>{reqSellersPara.date}</Box> */}
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {enquiry.mobile}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
