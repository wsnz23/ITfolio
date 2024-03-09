// import React from "react";
// import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Login from "./routes/Login";
import Contact from "./routes/Contact";
import SignUp from "./routes/SignUp";
import Material from "./scenes/matereal/material";
// import {Route,Routes} from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";

// import Dashboard from "./scenes/dashbord";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Pie from "./scenes/pie";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";


// function App() {
//   const [theme, colorMode] = useMode();
 
//   return (

          
 
//  <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/About" element={<About />} />
//   <Route path="/Login" element={<Login />} />
//   <Route path="/Dashboard" element={<Dashboard />} />
//   <Route path="/Contact" element={<Contact />} />
//   <Route path="/SignUp" element={<SignUp />} />
//  </Routes>

//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";

import Dashboard from "../src/scenes/dashbord";
import Team from "./scenes/Userprofile";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./scenes/global/Sidebar";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
           
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
             
              <Route path="/material" element={<Material />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/" element={<Home />} />
             <Route path="/About" element={<About />} />
             <Route path="/Login" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
             <Route path="/Contact" element={<Contact />} />
           <Route path="/SignUp" element={<SignUp />} />
           <Route path="/Pie" element={<Pie />} />
           <Route path="/Userprofile" element={<Team />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
