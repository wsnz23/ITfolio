// import { Box } from "@mui/material";
// import Header from "../../components/Header";
// import PieChart from "../../components/PieChart";
// import Sidebar from "../global/Sidebar";

// const Pie = () => {
//   return (
//     <Box m="5px" >

//       {/* <Header title="Pie Chart" subtitle="Simple Pie Chart" /> */}
      
//       <Box display="flex">
//         <Sidebar />
//         <Box flex="1" height="75vh" 
//         marginTop="150px"
//         >
//           <PieChart />
//           Pie Chart 
//           <br></br>
//           Simple Pie Chart
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Pie;
import React from "react";
import './style.css';
import { Box } from "@mui/system";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";


const skillsData = [
  { title: "HTML", percentage: 95, color: "html" },
  { title: "CSS", percentage: 80, color: "css" },
  { title: "JavaScript", percentage: 60, color: "javascript" },
  { title: "NodeJS", percentage: 40, color: "nodejs" },
  { title: "ReactJS", percentage: 70, color: "reactjs" },
  { title: "ExpressJS", percentage: 75, color: "expressjs" },
];

function SkillsBar() {
  return ( <div className="view"  display="flex" >
  <Sidebar />
    <Topbar />
    <div className="chart-container">
    <h2 className="settings-title">Skills acquired from university subjects</h2>
      {skillsData.map((skill, index) => (
        <div className="skill-box" key={index}>
        <h3> {skill.title} </h3>
          <div className="skill-bar">
            <span className={`skill-per ${skill.color}`}>
              <span className="tooltip">{`${skill.percentage}%`}</span>
            </span>
          </div>
        </div>
      ))}
   </div>
   </div>
  );
}

export default SkillsBar;

// import React from "react";
// import "./style.css";
// import { Box } from "@mui/system";
// import Sidebar from "../global/Sidebar";
// import Topbar from "../global/Topbar";

// const skillsData = [
//   { title: "HTML", percentage: 95, color: "html" },
//   { title: "CSS", percentage: 80, color: "css" },
//   { title: "JavaScript", percentage: 60, color: "javascript" },
//   { title: "NodeJS", percentage: 40, color: "nodejs" },
//   { title: "ReactJS", percentage: 70, color: "reactjs" },
//   { title: "ExpressJS", percentage: 75, color: "expressjs" },
// ];

// function SkillsBar() {
//   return (
//     <Box className="grid-container" >
//     {/* <div className="item1"> <Topbar /></div>  */}
//      <div className="item2"><Sidebar /></div>
//       <Box  className="item3">
//         <div className="conChart">
//           <h1 className="title-text">My Skills</h1>

//           {skillsData.map((skill, index) => (
//             <div className="skill-box" key={index}>
//               <span className="title">{skill.title}</span>
//               <div className="skill-bar">
//                 <span className={`skill-per ${skill.color}`}>
//                   <span className="tooltip">{`${skill.percentage}%`}</span>
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Box>
//     </Box>
//   );
// }

// export default SkillsBar;