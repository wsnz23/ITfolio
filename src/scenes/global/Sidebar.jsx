import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StarIcon from '@mui/icons-material/Star';
import logo1 from '../../assets/whitelogo.png';
import logo2 from '../../assets/blacklogo.png';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import PollTwoToneIcon from '@mui/icons-material/PollTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SchoolIcon from '@mui/icons-material/School';
import { linearGradientDef } from "@nivo/core";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)} // Update the selected state when clicked
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(null); // Initialize selected state to null

  const logoSrc = theme.palette.mode === 'dark' ? logo1 : logo2 ;

  return (
    <Box>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            // Customize scrollbar
            "&::-web-scrollbar": {
              width: "15px",
            },
            "&::-web-scrollbar-track": {
              backgroundColor: "#d1e5ff",
            },
            "&::-web-scrollbar-thumb": {
              background:linearGradientDef("#642bff","#ff22e6"),
            },
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
          height: "100%", // Set the height to 100% for the container
          display: "flex", // Use flex display for container
          display: "hidden",
        }}
      >
        <ProSidebar
          collapsed={isCollapsed}
          sx={{
            height: "100", // Set the height to 100% for ProSidebar
          }}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                  </Typography>
                  <IconButton
                    style={{ padding: 0, minWidth: "unset" }}
                    onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
              {!isCollapsed && (
                <Box display="flex" alignItems="center" ml="15px">
                  <img src={logoSrc} alt="Logo" style={{ height: "50px", marginTop: "10px" }} />
                </Box>
              )}
            </MenuItem>
           

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/Dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="User Profile"
                to="/Userprofile"
                icon={<AccountCircleTwoToneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Work Experience"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Education"
                to="/Education"
                icon={<SchoolIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Intrest"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Skills/Awards"
                to="/Awards"
                icon={<StarIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="CV"
                to="/cv"
                icon={<InsertDriveFileIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Charts
              </Typography>
              <Item
                title="Line Chart"
                to="/pie"
                icon={<PollTwoToneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Material
              </Typography>
              <Item
                title="Material"
                to="/mat"
                icon={<MenuBookTwoToneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <br />
              <Item
                title="Settings"
                to="/Settings"
                icon={<SettingsTwoToneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/"
                icon={<LogoutTwoToneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </Box>
  );
};

export default Sidebar;
