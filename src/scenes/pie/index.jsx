import React, { useState, useEffect } from 'react';
import './style.css';
import { Box, IconButton, Modal,useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import primary from "../../assets/primary.png";
import primaryb from "../../assets/primaryb.png";


function SkillsBar() {
  const [majorSkills, setMajorSkills] = useState([]);
  const [userMajor, setUserMajor] = useState('');
  const [userCheckboxes, setUserCheckboxes] = useState(null);
  const styles = {
    listItem: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      marginLeft: '10px',
    },
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const primarySrc = theme.palette.mode === 'dark' ? primaryb : primary ;

  const csLegend = [
    { name: "Skills from CS", color: "#B21E35" },
    { name: "Skills from CIS", color: "#0077B6" },
    { name: "Skills from BIT", color: "#FFAA00" },
    { name: "Skills form (CIS,CS,BIT)", color: "#825e3c" },
    { name: "Skills form (CS,BIT)", color: "#e8620d" },
    { name: "Skills from (CS,CIS)", color: "#340b3f" }
  ];
  
  const cisLegend = [
    { name: "Skills from CIS", color: "#0077B6" },
    { name: "Skills from CS", color: "#B21E35" },
    { name: "Skills from BIT", color: "#FFAA00" },
    { name: "Skills form (CIS,CS,BIT)", color: "#825e3c" },
    { name: "Skills from (CS,CIS)", color: "#340b3f" },
    { name: "Skills form (CS,BIT)", color: "#e8620d" }
  ];
  
  const bitLegend = [
    { name: "Skills from BIT", color: "#FFAA00" },
    { name: "Skills from CIS", color: "#0077B6" },
    { name: "Skills from CS", color: "#B21E35" },
    { name: "Skills form (CIS,CS,BIT)", color: "#825e3c" },
    { name: "Skills form (CS,BIT)", color: "#e8620d" },
    { name: "Skills from (CS,CIS)", color: "#340b3f" }
  ];
  
  const Legend = ({ legend }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    return (
      <div className="legend-container">
        <div className="legend-title">
          <h3>Legend</h3>
        </div>
        <div className="legend" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          {legend.map((item, index) => (
            <div key={index} className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginRight: '20px' }}>
              <div
                className="legend-color"
                style={{ backgroundColor: item.color, width: '20px', height: '20px', marginRight: '10px' }}
              />
              <span>{item.name}</span>
            </div>
          ))}
            <IconButton onClick={handleOpenModal} size="small" >
  <AddIcon />know more
</IconButton>
        </div>
        <br />
       
        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="modal">
            <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 10, right: 10 ,color:'white'}}>
              <CloseIcon />
            </IconButton>
            
            <img src={primarySrc} alt="Image" style={{ width: '70%', height: '95%' }} />
          </div>
        </Modal>
      </div>
    );
  };






  const cisccolors = [
    { name: "Database Management", color: "#0077B6" },
    { name: "Systems Analysis and Design", color: "#00B4D8" },
    { name: "Digital Media and Multimedia Technologies", color: "#90E0EF" },
    { name: "Applied Mathematics", color: "#B21E35" },
    { name: "Computer Systems and Architecture", color: "#BD1F36" },
    { name: "Algorithms and Data Structures", color: "#DA1E37" },
    { name: "Foundations of Computer Science", color: "#E35053" },
    { name: "Artificial Intelligence", color: "#E66063" },
    { name: "Web Development", color: "#FFAA00" },
    { name: "E-Business and E-Commerce", color: "#FFC300" },
    { name: "Computer Networks and Security", color: "#825e3c" },
    { name: "Programming and Software Development", color: "#340b3f" },
    { name: "Data Science and Analytics", color: "#e8620d" }
  ];

  const bitcolors = [
    { name: "Web Development", color: "#FFAA00" },
    { name: "E-Business and E-Commerce", color: "#FFEA00" },
    { name: "Management Information Systems (MIS)", color: "#FFE246" },
    { name: "Business Analytics and Decision Support", color: "#FFF75E" },
    { name: "Database Management", color: "#0077B6" },
    { name: "Systems Analysis and Design", color: "#00B4D8" },
    { name: "Digital Media and Multimedia Technologies", color: "#90E0EF" },
    { name: "Applied Mathematics", color: "#B21E35" },
    { name: "Computer Systems and Architecture", color: "#BD1F36" },
    { name: "Algorithms and Data Structures", color: "#DA1E37" },
    { name: "Foundations of Computer Science", color: "#E35053" },
    { name: "Artificial Intelligence", color: "#E66063" },
    { name: "Computer Networks and Security", color: "#825e3c" },
    { name: "Data Science and Analytics", color: "#e8620d" },
    { name: "Programming and Software Development", color: "#340b3f" }
  ];

  const csColors = [
    { name: "Applied Mathematics", color: "#B21E35" },
    { name: "Computer Systems and Architecture", color: "#BD1F36" },
    { name: "Algorithms and Data Structures", color: "#DA1E37" },
    { name: "Foundations of Computer Science", color: "#E35053" },
    { name: "Artificial Intelligence", color: "#E66063" },
    { name: "Database Management", color: "#0077B6" },
    { name: "Digital Media and Multimedia Technologies", color: "#90E0EF" },
    { name: "Web Development", color: "#FFAA00" },
    { name: "Computer Networks and Security", color: "#825e3c" },
    { name: "Data Science and Analytics", color: "#e8620d" },
    { name: "Programming and Software Development", color: "#340b3f" }
  ];

  const getColorForSkill = (skillName, major) => {
    let colorArray = [];
    switch (major) {
      case 'CIS':
        colorArray = cisccolors;
        break;
      case 'BIT':
        colorArray = bitcolors;
        break;
      case 'CS':
        colorArray = csColors;
        break;
      default:
        return '#007bff'; // Default color if no match
    }

    const skill = colorArray.find(s => s.name === skillName);
    return skill ? skill.color : '#007bff'; // Default color if no match
  };

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
        setUserMajor(userMajor); // Set userMajor state
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
            const percent = (totalRates / submenu.count);
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


  

  useEffect(() => {
    const fetchUserCheckboxes = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token); 
        const res = await Axios.post("http://localhost:3001/userdata", { token });
        const username = res.data.data.Username;
        const response = await Axios.get(`http://localhost:3001/user-checkboxes/${username}`);
        setUserCheckboxes(response.data);
      } catch (error) {
        console.error('Error fetching user checkboxes:', error);
      }
    };

    fetchUserCheckboxes();
  }, []);


  let legend;
  switch (userMajor) {
    case 'CIS':
      legend = cisLegend;
      break;
    case 'BIT':
      legend = bitLegend;
      break;
    case 'CS':
      legend = csLegend;
      break;
    default:
      legend = [];
  }

  return (
    <Box className="view" display="flex">
      <Topbar />
      <Sidebar />
      <Box flex="1" overflow="auto">
      <div class="container">
        <div className="chart-container">
          <h2 className="settings-title">Technical Skills acquired from university courses</h2>
          <Legend legend={legend} />
          {majorSkills.map((skill, index) => (
            <div className="skill-box" key={index}>
              <h3>{skill.skill}</h3>

              <div className="skill-bar">
                <span className={`skill-per`} style={{ width: `${skill.percent || 0}%`, backgroundColor: getColorForSkill(skill.skill, userMajor) }}>
                  <span className="tooltip">{skill.percent ? `${skill.percent.toFixed(2)}%` : '100%'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="soft-container">
            <h2 className="settings-title">Soft skills acquired from university courses</h2>
            {userCheckboxes ? (
              <ul>
                {userCheckboxes.checkboxes.map((checkbox, index) => (
                  <li key={index} style={styles.listItem}><input type="checkbox" checked={checkbox.isChecked} readOnly />
                    <h3>{checkbox.label}</h3>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          </div>
         

      </Box>
    </Box>
  );
}

export default SkillsBar;
