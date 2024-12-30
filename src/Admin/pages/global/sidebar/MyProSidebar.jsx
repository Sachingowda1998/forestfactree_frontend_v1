import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import StraightenIcon from "@mui/icons-material/Straighten";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import WebIcon from "@mui/icons-material/Web";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {
  useTheme,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";

import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import ImageIcon from "@mui/icons-material/Image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography
        sx={{
          fontSize: "16.2px",

          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
          },
          color: "black !important",
        }}
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Handle the accordion's expanded state
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
          // backgroundColor: "green !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
          // backgroundColor: "black !important",
          color: "black !important",
          fontSize: "20px !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        // backgroundColor={colors.primary[400]}
        backgroundColor="white"
        image={sidebarImage}
      >
        <Menu iconshape="square">
          {/* <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? null : null // /> //   onClick={() => setSidebarRTL(!sidebarRTL)} // <SwitchLeftOutlinedIcon // /> //   onClick={() => setSidebarRTL(!sidebarRTL)} // <SwitchRightOutlinedIcon
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          > */}
          <MenuItem
            icon={
              isMobile ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : null
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              // color: "red !important",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  // color={colors.grey[100]}
                  color="black !important"
                  sx={{ paddingLeft: 3 }}
                >
                  ADMIN PANEL
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon sx={{ color: "red !important" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  // color={colors.grey[100]}
                  color="black !important"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Forestfactree
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>

              <Item
                title="Dashboard"
                to="/admin"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                collapseSidebar={collapseSidebar}
              />



                <Item
                  title="Buyer Enquiries"
                  to="/admin/productenquiryfrombuyers"
                  icon={<QuestionAnswerIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />



            <Item
              title="Seller Enquiries"
              to="/admin/sellerrequest"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contact Us"
              to="/admin/getintouch"
              icon={<ContactMailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Of Buyers"
              to="/admin/buyerlist"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Of Sellers"
              to="/admin/sellerlist"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Products"
              to="/admin/productobjects"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Purchase History"
              to="/admin/purchasehistory"
              icon={<StoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
              title="Stock"
              to="/stock"
              icon={<ShoppingBagIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Sales History"
              to="/admin/SalesHistroyBillthree"
              icon={<HistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Summary"
              to="/admin/accounthistory"
              icon={<HistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <SubMenu
              label={
                <Typography
                  sx={{
                    fontSizeL: "17px",
                    color: "black !important",
                    [theme.breakpoints.down("sm")]: { fontSize: "14px" },
                  }}
                >
                  Product
                </Typography>
              }
              icon=<WebIcon />
            >
              <Item
                title="Category"
                to="/category"
                icon={<ImageIcon />}
                selected={selected}
                setSelected={setSelected}
                sx
              />
              <Item
                title="Sub category"
                to="/subcategory"
                icon={<ImageIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Units"
                to="/units"
                icon={<StraightenIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu> */}

            {/* <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === "panel1" ? (
                    <FaChevronUp style={{ color: "black" }} />
                  ) : (
                    <FaChevronDown style={{ color: "black" }} />
                  )
                }
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                  "& .MuiAccordionSummary-content": {
                    marginLeft: "11px !important",
                  },
                }}
              >
                <WebIcon style={{ color: "black" }} />{" "}
                <Typography
                  sx={{
                    color: "black",
                    paddingLeft: "10px",
                    whiteSpace: "nowrap",
                    width: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Product Management
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Item
                  title="Category"
                  to="/category"
                  icon={<ImageIcon style={{ color: "black" }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Sub category"
                  to="/subcategory"
                  icon={<ImageIcon style={{ color: "black" }} />} // Set icon color to black
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Units"
                  to="/units"
                  icon={<StoreIcon style={{ color: "black" }} />} // Set icon color to black
                  selected={selected}
                  setSelected={setSelected}
                />
              </AccordionDetails>
            </Accordion> */}

            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === "panel1" ? (
                    <FaChevronUp style={{ color: "black" }} />
                  ) : (
                    <FaChevronDown style={{ color: "black" }} />
                  )
                }
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                  "& .MuiAccordionSummary-content": {
                    marginLeft: "11px !important",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#3c8D9E",
                  },
                  "&.Mui-expanded": {
                    color: "#4CAF50 !important",
                  },
                }}
              >
                <WebIcon
                  sx={{
                    color: expanded === "panel1" ? "#4CAF50" : "black",
                  }}
                />{" "}
                <Typography
                  sx={{
                    color: "black",
                    fontSize: "16px",
                    paddingLeft: "12px",
                    whiteSpace: "nowrap",
                    width: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Categories/Units
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Item
                  title="Category"
                  to="/admin/category"
                  icon={
                    <ImageIcon
                      sx={{
                        "&:hover": {
                          color: "#3C8D9E !important",
                        },
                        "&.Mui-expanded": {
                          color: "#4CAF50 !important",
                        },
                      }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Subcategory"
                  to="/admin/subcategory"
                  icon={
                    <ImageIcon
                      sx={{
                        "&:hover": {
                          color: "#3C8D9E !important",
                        },
                        "&.Mui-expanded": {
                          color: "#4CAF50 !important",
                        },
                      }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Units"
                  to="/admin/units"
                  icon={
                    <StoreIcon
                      sx={{
                        "&:hover": {
                          color: "#3C8D9E !important",
                        },
                        "&.Mui-expanded": {
                          color: "#4CAF50 !important",
                        },
                      }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
              </AccordionDetails>
            </Accordion>

            <Item
              title="Website Details"
              to="/admin/companyprofile"
              icon={<ImageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
