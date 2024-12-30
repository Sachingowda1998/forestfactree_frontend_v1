import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme, Box, IconButton, MenuItem, Menu } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAdminAuth } from "../../../App";



const Topbar = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

    // Use the AdminAuth context to get the logout function
    const { logout } = useAdminAuth();

    const handleLogout = () => {
      logout(); // Calling logout function to remove adminToken
      navigate("/admin/login"); // Redirecting to login page
      // handleMenuClose(); 
      // // Close the menu after logout
    };

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const [notifications] = useState([
    { id: 1, message: "New Order", time: "2 mins ago" },
    { id: 2, message: "New Seller Request", time: "5 mins ago" },
    { id: 3, message: "New Enquiry Request", time: "10 mins ago" },
  ]);

  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profileupdateform");
    handleMenuClose();
  };

  const handleViewAllClick = () => {
    alert("hi");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ backgroundColor: "White", borderBottom: "2px solid #b0acac" }}
    >
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon style={{ color: "black" }} />
          </IconButton>
        )}
      </Box>
      <Box display="flex">
        {/* <IconButton onClick={handleClick}>
          <NotificationsIcon sx={{ color: "red" }} />
        </IconButton>
        <Popover
          id={id}
          open={Boolean(anchorEl2)}
          anchorEl={anchorEl2}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, width: 300, backgroundColor: "white" }}>
            {notifications.slice(0, 2).map((notification) => (
              <Typography key={notification.id} sx={{ mb: 1, color: "black" }}>
                {notification.message} - {notification.time}
              </Typography>
            ))}
            <Typography
              sx={{
                color: "blue",
                cursor: "pointer",
                fontSize: "14px",
                textAlign: "center",
              }}
              onClick={handleViewAllClick}
            >
              View All
            </Typography>
          </Box>
        </Popover> */}
        <IconButton onClick={handleMenuClick}>
          <PersonOutlinedIcon sx={{ color: "blue" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* <MenuItem onClick={handleProfileClick}>Profile</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;

// import React from "react";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import {
//   useTheme,
//   Box,
//   IconButton,
//   InputBase,
//   MenuItem,
//   Menu,
// } from "@mui/material";
// // import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import { useProSidebar } from "react-pro-sidebar";
// import { useNavigate } from "react-router-dom";
// const Topbar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const colorMode = useContext(ColorModeContext);
//   const { toggleSidebar, broken, rtl } = useProSidebar();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const navigate = useNavigate();

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     navigate("/profileupdateform");
//   };

//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       <Box display="flex">
//         {broken && !rtl && (
//           <IconButton
//             sx={{ margin: "0 6 0 2" }}
//             onClick={() => toggleSidebar()}
//           >
//             <MenuOutlinedIcon />
//           </IconButton>
//         )}
//       </Box>
//       <Box display="flex">
//         {/* <IconButton>
//           <SettingsOutlinedIcon />
//         </IconButton> */}
//         <IconButton>
//           <PersonOutlinedIcon onClick={handleMenuClick} />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//         >
//           <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//           <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Topbar;
