import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Container, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import GroupIcon from "@mui/icons-material/Group";

function UsersDash() {
  const theme = useTheme();
  // const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <div>
      <Header title="Buyer's Dashboard" subtitle="" />

      <div>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
              <Link to="/userenquiry" style={{ textDecoration: "none" }}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title="200"
                    subtitle="Buyer's enquiry Req. and Pending"
                    icon={
                      <GroupIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: "26px",
                        }}
                        showProgress={true}
                      />
                    }
                  />
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div>
        <Container>
          <h2 style={{ marginTop: "18px" }}>Buyer's Status Box</h2>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
              <Link to="/userenquirydone2" style={{ textDecoration: "none" }}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title="150"
                    subtitle="Buyer's Enquiry Done"
                    icon={
                      <VerifiedIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Box>
              </Link>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
              <Link
                to="/userenquirypending2"
                style={{ textDecoration: "none" }}
              >
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title="2324"
                    subtitle="Buyer's Enquiry Pending"
                    icon={
                      <BlockIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default UsersDash;
