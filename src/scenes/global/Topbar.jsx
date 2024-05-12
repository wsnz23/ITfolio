import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      width="50%"
      zIndex={1000}
      pointerEvents="none" // Prevents the top bar from capturing mouse events
    >
      {/* Transparent background */}
      <Box
        bgcolor="transparent"
        pointerEvents="auto" // Allows elements inside the top bar to capture mouse events
        display="flex"
        justifyContent="flex-end" // Aligns the icons to the right
        p={2}
      >
        {/* Icons */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Link to="/">
          <IconButton>
            <LogoutTwoToneIcon/>
          </IconButton>
        </Link>
        {/* Add other icons here if needed */}
      </Box>
    </Box>
  );
};

export default Topbar;
