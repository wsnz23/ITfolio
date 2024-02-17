import React from "react";
import "./index.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Login from "./routes/Login";
import Contact from "./routes/Contact";
import SignUp from "./routes/SignUp";
import {Route,Routes} from "react-router-dom";


function App() {
  return (
 <>
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/About" element={<About />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/Contact" element={<Contact />} />
  <Route path="/SignUp" element={<SignUp />} />
 </Routes>
</>
  );
}

export default App;
