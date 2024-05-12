import React, { useState, useEffect } from 'react';
import './style.css';
import { Box } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Axios from "axios";

function SkillsBar() {
  const [majorSkills, setMajorSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token); // Log the token to check if it's correct

        // Fetch chart data
        const chartResponse = await Axios.get("http://localhost:3001/getchart");
        const chartData = chartResponse.data;

        // Fetch user data using the token
        const response = await Axios.post("http://localhost:3001/userdata", { token });
        const userMajor = response.data.data.Major;
        const username = response.data.data.Username;
        const userData = response.data.data;
        console.log(userData);

        // Check if user exists in chart data
        const userExists = chartData.some(data => data.username === username);
        console.log(userExists);

        if (userExists) {
          // Find the document related to the user's major
          const userDocument = chartData.find(data => data.username === username);
          console.log(userDocument);

          
          const skillsWithPercentage = userDocument.submenu.map(submenu => {
            const totalRates = submenu.courses.reduce((total, course) => total + (course.rate || 0), 0);
            const percent = (totalRates / submenu.count) ;
            return { skill: submenu.skills, percent };
          });
          setMajorSkills(skillsWithPercentage); 
        } else {
          console.error(`Error: No data found for user '${username}'`);
         
          const userMajorDocument = chartData.find(doc => doc.major === userMajor);
          console.log(userMajorDocument);
           if (userMajorDocument) {
      
            const skillsWithPercentage = userMajorDocument.submenu.map(submenu => {
             const totalRates = submenu.courses.reduce((total, course) => total + (course.rate || 0), 0);
             const percent = (totalRates / submenu.count) * 100; 
              return { skill: submenu.skills, percent };
             });
            setMajorSkills(skillsWithPercentage);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="view" display="flex">
      <Topbar />
      <Sidebar />
      <Box flex="1" overflow="auto">
      <div className="chart-container">
        <h2 className="settings-title">Skills acquired from university subjects</h2>
        {majorSkills.map((skill, index) => (
          <div className="skill-box" key={index}>
            <h3>{skill.skill}</h3>
            
            <div className="skill-bar">
              <span className={`skill-per`} style={{ width: `${skill.percent || 0}%`, backgroundColor: '#007bff' }}>
                <span className="tooltip">{skill.percent ? `${skill.percent.toFixed(2)}%` : '0%'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Box>
    </Box>
  );
}

export default SkillsBar;
