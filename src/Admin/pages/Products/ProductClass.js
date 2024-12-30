import React from "react";
import Header from "../../components/Header";
import { Box, useTheme, Container, useMediaQuery, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import CategoryIcon from "@mui/icons-material/Category";
import VerifiedIcon from "@mui/icons-material/Verified";

import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { Link, useNavigate } from "react-router-dom";
function ProductClass() {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <Button 
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => navigate("/productdetails")}
        >
          ADD Product
        </Button>
      </Box>
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="PRODUCT DASHBOARD" subtitle="" />
      </Box>

      <Container>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Link to="/productslist" style={{ textDecoration: "none" }}>
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title="12,361"
                  subtitle="All Products"
                  icon={
                    <CategoryIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Link>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Link to="/hideproductslist" style={{ textDecoration: "none" }}>
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title="431,225"
                  subtitle="Hide Products"
                  icon={
                    <VerifiedIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                  showProgress={false}
                />
              </Box>
            </Link>
          </Grid>
          {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="32,441"
                subtitle="Disapproval Products"
                icon={
                  <CancelIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
                showProgress={true}
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
                title="1,325,134"
                subtitle="Not Verified Products"
                icon={
                  <PendingActionsIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
                showProgress={true}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

export default ProductClass;
