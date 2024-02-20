import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import Sidebar from "../global/Sidebar";

const Pie = () => {
  return (
    <Box m="5px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      
      <Box display="flex">
        <Sidebar />
        <Box flex="1" height="75vh">
          <PieChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Pie;