import React, { useState, useEffect } from 'react';
import './mat.css';
import Popup from '../../components/Popup.js';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';
import CS from './cs.json';
import CIS from './cis.json';
import BIT from './bit.json';
import { Box } from "@mui/material";
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function Mat({ skills, questions }) {
  const [selected, setSelected] = useState(null);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState({});
  const [userMajor, setUserMajor] = useState('');
  const [totalRatingValue, setTotalRatingValue] = useState(0); // Total rating value
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility
  const [storedTotalRatingValue, setStoredTotalRatingValue] = useState(0); // State to store total rating value
  const [submenuData, setSubmenuData] = useState([]);
  const [csforsubmenuData, cssetSubmenuData] = useState([]);
  const [bitforsubmenuData, bitsetSubmenuData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility

  const bitnewSubmenuData   = [
    {
      skills: "Computer Networks and Security",
      sumRate: 0,
      count: 5,
      courses: [
        {
          name: "Information Security and Privacy",
          rate: null
        },
        {
          name: "Computer Networks",
          rate: null
        },
        {
          name: "Security Risk Management and Ethics",
          rate: null
        },
        {
          name: "Fundamentals of IoT",
          rate: null
        },
        {
          name: "Advanced Networking",
          rate: null
        }
      ]
    },
    {
      skills: "Web Development",
      sumRate: 0,
      count: 3,
      courses: [
        {
          name: "Web Applications Development",
          rate: null
        },
        {
          name: "Web Server Programming",
          rate: null
        },
        {
          name: "Advanced Web Development",
          rate: null
        }
      ]
    },
    {
      skills: "Data Science and Analytics",
      sumRate: 0,
      count: 6,
      courses: [
        {
          name: "Statistical Packages",
          rate: null
        },
        {
          name: "Computer Ethics",
          rate: null
        },
        {
          name: "Semantic Web",
          rate: null
        },
        {
          name: "Information Retrieval",
          rate: null
        },
        {
          name: "Database Languages and Tools",
          rate: null
        },
        {
          name: "Data Mining",
          rate: null
        }
      ]
    },
    {
      skills: "E-Business and E-Commerce",
      sumRate: 0,
      count: 4,
      courses: [
        {
          name: "Mobile Programming",
          rate: null
        },
        {
          name: "E-Payment Systems",
          rate: null
        },
        {
          name: "E-Business",
          rate: null
        },
        {
          name: "Business Intelligence",
          rate: null
        }
      ]
    },
    {
      skills: "Management Information Systems (MIS)",
      sumRate: 0,
      count: 10,
      courses: [
        {
          name: "Management Information Systems",
          rate: null
        },
        {
          name: "Enterprise Resource Planning Systems",
          rate: null
        },
        {
          name: "Knowledge Management Systems",
          rate: null
        },
        {
          name: "Total Quality Management",
          rate: null
        },
        {
          name: "Document Analysis & Recognition",
          rate: null
        },
        {
          name: "Information Resource Management",
          rate: null
        },
        {
          name: "E-Learning & Applications",
          rate: null
        },
        {
          name: "E-Government",
          rate: null
        },
        {
          name: "Software Packages",
          rate: null
        },
        {
          name: "Enterprise Application Development",
          rate: null
        }
      ]
    },
    {
      skills: "Business Analytics and Decision Support",
      sumRate: 0,
      count: 4,
      courses: [
        {
          name: "Simulation in Business",
          rate: null
        },
        {
          name: "Operations Research",
          rate: null
        },
        {
          name: "Accounting Principles (1)",
          rate: null
        },
        {
          name: "Principles of Microeconomics",
          rate: null
        }
      ]
    },
    {
      skills: "Foundations of Computer Science",
      sumRate: 0,
      count: 3,
      courses: [
        {
          name: "Discrete Mathematics",
          rate: null
        },
        {
          name: "Fundamentals of Information Technology",
          rate: null
        },
        {
          name: "Linear Algebra for Computational Sciences",
          rate: null
        }
      ]
    },
    {
      skills: "Applied Mathematics",
      sumRate: 0,
      count: 1,
      courses: [
        {
          name: "Calculus 1",
          rate: null
        }
      ]
    },
    {
      skills: "Algorithms and Data Structures",
      sumRate: 0,
      count: 2,
      courses: [
        {
          name: "Data Structures",
          rate: null
        },
        {
          name: "Theory of Algorithms",
          rate: null
        }
      ]
    },
    {
      skills: "Computer Systems and Architecture",
      sumRate: 0,
      count: 1,
      courses: [
        {
          name: "Operating Systems",
          rate: null
        }
      ]
    },
    {
      skills: "Artificial Intelligence",
      sumRate: 0,
      count: 1,
      courses: [
        {
          name: "Artificial Intelligence",
          rate: null
        }
      ]
    },
    {
      skills: "Programming and Software Development",
      sumRate: 0,
      count: 4,
      courses: [
        {
          name: "Computer Skills for Scientific Faculties (C++)",
          rate: null
        },
        {
          name: "Object Oriented Programming (Java)",
          rate: null
        },
        {
          name: "Advanced Java Programming",
          rate: null
        },
        {
          name: "Software Engineering",
          rate: null
        }
      ]
    },
    {
      skills: "Systems Analysis and Design",
      sumRate: 0,
      count: 3,
      courses: [
        {
          name: "Project Management",
          rate: null
        },
        {
          name: "Systems Analysis and Design",
          rate: null
        },
        {
          name: "Human Computer Interaction",
          rate: null
        }
      ]
    },
    {
      skills: "Digital Media and Multimedia Technologies",
      sumRate: 0,
      count: 1,
      courses: [
        {
          name: "Multimedia",
          rate: null
        }
      ]
    },
    {
      skills: "Database Management",
      sumRate: 0,
      count: 1,
      courses: [
        {
          name: "Database Management Systems",
          rate: null
        }
      ]
    }
  ];
  
  const csnewSubmenuData  = [
      {
        skills: "Programming and Software Development",
        sumRate: 0,
        count: 8,
        courses: [
          {
            name: "Computer Skills for Scientific Faculties (C++)",
            rate: null
          },
          {
            name: "Object Oriented Programming (Java)",
            rate: null
          },
          {
            name: "Software Engineering",
            rate: null
          },
          {
            name: "Advanced Programming in Special Languages",
            rate: null
          },
          {
            name: "Systems Programming and Compilers Construction",
            rate: null
          },
          {
            name: "Design and Implementation of Programming Languages",
            rate: null
          },
          {
            name: "Design Patterns and Clean Code",
            rate: null
          },
          {
            name: "Mobile Development Frameworks",
            rate: null
          }
        ]
      },
      {
        skills: "Computer Networks and Security",
        sumRate: 0,
        count: 8,
        courses: [
          {
            name: "Information Security and Privacy",
            rate: null
          },
          {
            name: "Computer Networks",
            rate: null
          },
          {
            name: "Advanced Networking",
            rate: null
          },
          {
            name: "Network Programming",
            rate: null
          },
          {
            name: "Mobile Wireless Networks",
            rate: null
          },
          {
            name: "Fundamentals of IoT",
            rate: null
          },
          {
            name: "Security of Web Applications",
            rate: null
          },
          {
            name: "Network Security",
            rate: null
          }
        ]
      },
      {
        skills: "Data Science and Analytics",
        sumRate: 0,
        count: 4,
        courses: [
          {
            name: "Principles of Statistics",
            rate: null
          },
          {
            name: "Computer Ethics",
            rate: null
          },
          {
            name: "Applied Statistics",
            rate: null
          },
          {
            name: "Bioinformatics",
            rate: null
          }
        ]
      },
      {
        skills: "Applied Mathematics",
        sumRate: 0,
        count: 4,
        courses: [
          {
            name: "Calculus 1",
            rate: null
          },
          {
            name: "Calculus 2",
            rate: null
          },
          {
            name: "Numerical Analysis",
            rate: null
          },
          {
            name: "Modeling and Simulation",
            rate: null
          }
        ]
      },
      {
        skills: "Computer Systems and Architecture",
        sumRate: 0,
        count: 7,
        courses: [
          {
            name: "Operating Systems",
            rate: null
          },
          {
            name: "Physics",
            rate: null
          },
          {
            name: "Physics Lab",
            rate: null
          },
          {
            name: "Logic Design",
            rate: null
          },
          {
            name: "Computer Organization",
            rate: null
          },
          {
            name: "Parallel and Distributed Systems",
            rate: null
          },
          {
            name: "Computer Systems Performance",
            rate: null
          }
        ]
      },
      {
        skills: "Algorithms and Data Structures",
        sumRate: 0,
        count: 5,
        courses: [
          {
            name: "Theory of Algorithms",
            rate: null
          },
          {
            name: "Data Structures",
            rate: null
          },
          {
            name: "Data Structures Lab",
            rate: null
          },
          {
            name: "Computational Problems and Techniques",
            rate: null
          },
          {
            name: "Graph Theory",
            rate: null
          }
        ]
      },
      {
        skills: "Foundations of Computer Science",
        sumRate: 0,
        count: 4,
        courses: [
          {
            name: "Discrete Mathematics",
            rate: null
          },
          {
            name: "Fundamentals of Information Technology",
            rate: null
          },
          {
            name: "Linear Algebra for Computational Sciences",
            rate: null
          },
          {
            name: "Theory of Computation",
            rate: null
          }
        ]
      },
      {
        skills: "Artificial Intelligence",
        sumRate: 0,
        count: 2,
        courses: [
          {
            name: "Artificial Intelligence",
            rate: null
          },
          {
            name: "Machine Learning and Neural Networks",
            rate: null
          }
        ]
      },
      {
        skills: "Database Management",
        sumRate: 0,
        count: 2,
        courses: [
          {
            name: "Database Management Systems",
            rate: null
          },
          {
            name: "Database Technologies and Applications",
            rate: null
          }
        ]
      },
      {
        skills: "Digital Media and Multimedia Technologies",
        sumRate: 0,
        count: 2,
        courses: [
          {
            name: "Computer Graphics",
            rate: null
          },
          {
            name: "Digital Image Processing",
            rate: null
          }
        ]
      },
      {
        skills: "Web Development",
        sumRate: 0,
        count: 2,
        courses: [
          {
            name: "Web Applications Development",
            rate: null
          },
          {
            name: "Advanced Web Development",
            rate: null
          }
        ]
      }
    
  ];
  

  const newSubmenuData  = [
    {
        skills: "Programming and Software Development",
        sumRate: 0,
        count: 11,
        courses: [
            { name: "Computer Skills for Scientific Faculties (C++)", rate: null },
            { name: "Object Oriented Programming (Java)", rate: null },
            { name: "Advanced Java Programming", rate: null },
            { name: "Software Engineering", rate: null },
            { name: "Advanced Software Engineering", rate: null },
            { name: "Mobile Development Frameworks", rate: null },
            { name: "Geographical Information Systems", rate: null },
            { name: "Advanced AI Programming", rate: null },
            { name: "Natural Language Processing", rate: null },
            { name: "Intelligent Information Systems", rate: null },
            { name: "Game Engines Design", rate: null }
        ]
    },
    {
        skills: "Computer Networks and Security",
        sumRate: 0,
        count: 3,
        courses: [
            { name: "Information Security and Privacy", rate: null },
            { name: "Computer Networks", rate: null },
            { name: "Security of Web Applications", rate: null }
        ]
    },
    {
        skills: "Database Management",
        sumRate: 0,
        count: 5,
        courses: [
            { name: "Database Management Systems", rate: null },
            { name: "Advanced Databases", rate: null },
            { name: "Health Informatics", rate: null },
            { name: "Database Technologies and Applications", rate: null },
            { name: "Information and Knowledge Management", rate: null }
        ]
    },
    {
        skills: "Systems Analysis and Design",
        sumRate: 0,
        count: 13,
        courses: [
            { name: "Computing Ethics and Documentation", rate: null },
            { name: "Information Systems and Applications", rate: null },
            { name: "Human Computer Interaction", rate: null },
            { name: "Computer Assisted Learning", rate: null },
            { name: "Project Management", rate: null },
            { name: "Systems Analysis and Design", rate: null },
            { name: "Information Technology Entrepreneurship and Innovation", rate: null },
            { name: "User Interface/Experience Design", rate: null },
            { name: "Business Process Re-engineering", rate: null },
            { name: "Development and Operations (DevOps)", rate: null },
            { name: "Information Systems Audit and Quality Assurance", rate: null },
            { name: "Cloud Computing", rate: null },
            { name: "Internet of Things (IoT)", rate: null }
        ]
    },
    {
        skills: "Digital Media and Multimedia Technologies",
        sumRate: 0,
        count: 5,
        courses: [
            { name: "Multimedia", rate: null },
            { name: "Advanced Multimedia", rate: null },
            { name: "Digital Image Processing", rate: null },
            { name: "Virtual Reality", rate: null },
            { name: "Digital Speech Processing", rate: null }
        ]
    },
    {
        skills: "Foundations of Computer Science",
        sumRate: 0,
        count: 3,
        courses: [
            { name: "Discrete Mathematics", rate: null },
            { name: "Fundamentals of Information Technology", rate: null },
            { name: "Linear Algebra for Computational Sciences", rate: null }
        ]
    },
    {
        skills: "Applied Mathematics",
        sumRate: 0,
        count: 1,
        courses: [
            { name: "Calculus 1", rate: null }
        ]
    },
    {
        skills: "Algorithms and Data Structures",
        sumRate: 0,
        count: 2,
        courses: [
            { name: "Data Structures", rate: null },
            { name: "Theory of Algorithms", rate: null }
        ]
    },
    {
        skills: "Computer Systems and Architecture",
        sumRate: 0,
        count: 1,
        courses: [
            { name: "Operating Systems", rate: null }
        ]
    },
    {
        skills: "Data Science and Analytics",
        sumRate: 0,
        count: 2,
        courses: [
            { name: "Principles of Statistics", rate: null },
            { name: "Data Mining", rate: null }
        ]
    },
    {
        skills: "Artificial Intelligence",
        sumRate: 0,
        count: 2,
        courses: [
            { name: "Artificial Intelligence", rate: null },
            { name: "Machine Learning and Neural Networks", rate: null }
        ]
    },
    {
        skills: "Web Development",
        sumRate: 0,
        count: 2,
        courses: [
            { name: "Web Applications Development", rate: null },
            { name: "Web Server Programming", rate: null }
        ]
    },
    {
        skills: "E-Business and E-Commerce",
        sumRate: 0,
        count: 1,
        courses: [
            { name: "E-Payment Systems", rate: "" }
        ]
    }

];

  const createMajor = async (e) => {
    setDialogOpen(true);
      // Calculate the adjusted total rating value (divide by 5)
      const adjustedTotalRatingValue = totalRatingValue / 5;
 
    console.log("Adjusted Total Rating Value:", adjustedTotalRatingValue,selectedMaterial.label );
    e.preventDefault();
   

 if(userMajor=="CIS"){
for (const item of newSubmenuData) {
  // Iterate over courses in each item
  for (const course of item.courses) {
      // Check if the course name matches selectedMaterial.label
      if (course.name === selectedMaterial.label) {
        console.log("true")
          // Update the rate of the course with the adjusted total rating value
          course.rate = adjustedTotalRatingValue;
          console.log(course.rate)
      }
  }
}
console.log("true1")
}

if(userMajor=="CS"){
for (const item of csnewSubmenuData) {
  // Iterate over courses in each item
  for (const course of item.courses) {
      // Check if the course name matches selectedMaterial.label
      if (course.name === selectedMaterial.label) {
        console.log("true")
          // Update the rate of the course with the adjusted total rating value
          course.rate = adjustedTotalRatingValue;
          console.log(course.rate)
      }
  }
}
console.log("true3")
}

if(userMajor=="BIT"){
for (const item of bitnewSubmenuData) {
  // Iterate over courses in each item
  for (const course of item.courses) {
      // Check if the course name matches selectedMaterial.label
      if (course.name === selectedMaterial.label) {
        console.log("true")
          // Update the rate of the course with the adjusted total rating value
          course.rate = adjustedTotalRatingValue;
          console.log(course.rate)
      }
  }
}
console.log("true3")
}

try {
  const token = localStorage.getItem('token');
  console.log(token); // Log the token to check if it's correct
   const chartResponse = await Axios.get("http://localhost:3001/getchart");

  // Fetch user data using the token
  const response = await Axios.post("http://localhost:3001/userdata", { token });
  const userMajor = response.data.data.Major;
  const username = response.data.data.Username;
  const userData = response.data.data;
  console.log(userData);

  // Check if the user has a major schema
  if (userData) {
    // Check if the username exists in the chart data
    const chartData = chartResponse.data;
    const userExists = chartData.some(data => data.username === username);
    if (userExists) {
      // User has a major schema, update it using PUT
      const updateMajorResponse = await Axios.put(`http://localhost:3001/updateMajor/${username}`, {
          courseName: selectedMaterial.label, // Send the course name to update
          rate: adjustedTotalRatingValue // Send the updated rate
      });
      console.log("Major schema updated successfully:", updateMajorResponse.data);
    } else {
      if(userMajor=='CIS'){
      const createMajorResponse = await Axios.post("http://localhost:3001/createMajor", {
        username: username,
        major: userMajor,
        submenu: newSubmenuData // Use the updated submenu data
        
      });
      console.log("Major schema created successfully:", createMajorResponse.data);
    }

      if(userMajor=='CS'){
      const createMajorResponse = await Axios.post("http://localhost:3001/createMajor", {
        username: username,
        major: userMajor,
        submenu: csnewSubmenuData // Use the updated submenu data
      });
      console.log("Major schema created successfully:", createMajorResponse.data);}

      if(userMajor=='BIT'){
      const createMajorResponse = await Axios.post("http://localhost:3001/createMajor", {
        username: username,
        major: userMajor,
        submenu: bitnewSubmenuData // Use the updated submenu data
      });
      console.log("Major schema created successfully:", createMajorResponse.data);}
     
    }
  } else {
    console.log("No user data found.");
  }
  resetState();
  setPopupTrigger(false);
} catch (error) {
  console.error("Error:", error);
}
  }

  const resetState = () => {
    setPopupTrigger(false);
    setSelectedRatings({});
    setTotalRatingValue(0); // Reset total rating value
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handleButtonClick = (material) => {
    setSelectedMaterial(material);
    setPopupTrigger(true);
  };

 

  
  const handleRatingChange = (questionId, subskill, rating) => {
    // Define values for each rating
    const ratingValues = {
      'poor': 25,
      'good': 50,
      'very-good': 75,
      'excellent': 100
    };
    // Update selectedRatings with the value of the selected rating
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [`${questionId}_${subskill}`]: ratingValues[rating],
    }));
  };

  useEffect(() => {
    // Reset the state when the component mounts
    resetState();
  
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    console.log(token); // Log the token to check if it's correct
  
    // Fetch user data using the token
    Axios.post("http://localhost:3001/userdata", { token })
    .then(result => {
      console.log(result.data);// Log the response data to see if it contains the user data
      setUserMajor(result.data.data.Major);

    })
    
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  
  // Function to find the major data based on the major name
  const findMajorData = (majorName) => {
    switch (majorName) {
      case 'CS':
        return CS;
      case 'CIS':
        return CIS;
      case 'BIT':
        return BIT;
      default:
        return []; // Return an empty array if major data is not found
    }
  };

  useEffect(() => {
    // Calculate total rating value whenever selectedRatings changes
    const ratingsArray = Object.values(selectedRatings);
    const totalValue = ratingsArray.reduce((total, value) => total + value, 0);
    setTotalRatingValue(totalValue);
  }, [selectedRatings]);

  // Reset stored total rating value when dialog is closed
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setStoredTotalRatingValue(0);
    setPopupVisible(false); // Close the popup when dialog is closed
    
  };



  
  const [userCheckboxes, setUserCheckboxes] = useState([]);
const [checkedState, setCheckedState] = useState({});

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetch user data using the token
      const response = await Axios.post("http://localhost:3001/userdata", { token });
      const username = response.data.data.Username;

      const checkboxesResponse = await Axios.get(`http://localhost:3001/usercheckboxes/${username}`);
      const checkboxesData = checkboxesResponse.data; // Get the checkboxes data

      // Initialize checked state based on fetched data
      const initialCheckedState = {};
      checkboxesData.forEach(checkbox => {
        initialCheckedState[checkbox.label] = checkbox.isChecked;
      });
      setCheckedState(initialCheckedState);

      // Set userCheckboxes state
      setUserCheckboxes(checkboxesData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchData();
}, []);
const handleCheckboxChange = async (submenuItem, isChecked) => {
  try {
    const token = localStorage.getItem('token');
    // Fetch user data using the token
    const response = await Axios.post("http://localhost:3001/userdata", { token });
    const username = response.data.data.Username;

    // Define the state to be saved
    const newState = isChecked ? true : false;

    // Check if the label already exists in the user schema
    const existingCheckboxIndex = userCheckboxes.findIndex(cb => cb.label === submenuItem.label);

    if (existingCheckboxIndex === -1 && isChecked) {
      // If checkbox is not found and isChecked is true, post the label with isChecked as true
      const res = await Axios.post("http://localhost:3001/usercheckboxes", {
        username: username,
        checkboxes: [{ label: submenuItem.label, isChecked: newState }]
      });
      console.log("Label saved successfully:", res.data);
    } else if (existingCheckboxIndex !== -1 && !isChecked) {
      // If checkbox exists and isChecked is false, delete the label
      const res = await Axios.delete(`http://localhost:3001/usercheckboxes/${username}/${submenuItem.label}`);
      console.log("Label deleted successfully:", res.data);
    } else if (existingCheckboxIndex !== -1 && isChecked !== userCheckboxes[existingCheckboxIndex].isChecked) {
      // If checkbox exists and isChecked is different from the current state, update the label
      const res = await Axios.put(`http://localhost:3001/usercheckboxes/${username}/${submenuItem.label}`, {
        isChecked: newState
      });
      console.log("Label updated successfully:", res.data);
    }

    // Update both userCheckboxes and checkedState
    setUserCheckboxes(prevCheckboxes => {
      const updatedCheckboxes = [...prevCheckboxes];
      if (existingCheckboxIndex === -1 && isChecked) {
        updatedCheckboxes.push({ label: submenuItem.label, isChecked: newState });
      } else if (existingCheckboxIndex !== -1 && !isChecked) {
        updatedCheckboxes.splice(existingCheckboxIndex, 1); // Remove the checkbox
      } else if (existingCheckboxIndex !== -1 && isChecked !== userCheckboxes[existingCheckboxIndex].isChecked) {
        updatedCheckboxes[existingCheckboxIndex].isChecked = newState;
      }
      return updatedCheckboxes;
    });

    setCheckedState(prevState => ({
      ...prevState,
      [submenuItem.label]: isChecked
    }));
  } catch (error) {
    console.error('Error saving or updating checkbox state:', error);
  }
};

  
  
  
  
  return (
    <Box className="view" display="flex">

      <Sidebar />
      { !popupTrigger && <Topbar /> } {/* Render Topbar if popupTrigger is false */}
      <Box flex="1" overflow="auto">
        <div className={`card ${selected === 2 ? 'show' : ''}`}>

  <div className='a'>
    <div className='b'>
      {userMajor &&
        findMajorData(userMajor).map((item, i) => (
          <div className='c' key={i}>
            <div className='d' onClick={() => toggle(i)}>
              <h2>{item.label}</h2>
              <span>{selected === i ? '-' : '+'}</span>
            </div>
            {selected === i && item.submenu && (
              <table className='e show'>
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {item.submenu.map((submenuItem, j) => (
                    <tr key={j}>
                      <td>{submenuItem.label}</td>
                      <td>
                        {item.label === 'Subjects Soft Skills' ? ( // Check if the label matches
                         <input
                         type='checkbox'
                         value={submenuItem.label}
                         checked={submenuItem.isChecked || checkedState[submenuItem.label] || false}
                         onChange={(event) => handleCheckboxChange(submenuItem, event.target.checked)}
                         className='buttonmat'
                       />
                       
                        ) : (
                          <button onClick={() => handleButtonClick(submenuItem)} className='buttonmat'>
                            Action
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
    </div>
  </div>


          {popupTrigger && selectedMaterial && (
            <Popup trigger={popupTrigger} setTrigger={() => { setPopupTrigger(false); resetState(); }}>
              <div>
                <h3 className='poph3'>{selectedMaterial.label} - Skills</h3>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Subskill</th> */}
                      <th>Question</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMaterial.skills && selectedMaterial.question && selectedMaterial.skills.map((subskill, index) => (
                      <tr key={index}>
                        {/* <td>{subskill}</td> */}
                        <td className='tdpop'>{selectedMaterial.question[index]}</td>
                        <td className='tdpop' >
                          <div className="rating-buttons">
                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="poor"
                                checked={selectedRatings[`${index}_${subskill}`] === 25} // Adjusted to compare with values
                                onChange={() => handleRatingChange(index, subskill, 'poor')}
                              />
                              Poor
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="good"
                                checked={selectedRatings[`${index}_${subskill}`] === 50} // Adjusted to compare with values
                                onChange={() => handleRatingChange(index, subskill, 'good')}
                              />
                              Good
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="very-good"
                                checked={selectedRatings[`${index}_${subskill}`] === 75} // Adjusted to compare with values
                                onChange={() => handleRatingChange(index, subskill, 'very-good')}
                              />
                              Very Good
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="excellent"
                                checked={selectedRatings[`${index}_${subskill}`] === 100} // Adjusted to compare with values
                                onChange={() => handleRatingChange(index, subskill, 'excellent')}
                              />
                              Excellent
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='popupbutton'>
                  <button className='buttonmat' onClick={createMajor}>Submit</button>
                </div>
              </div>
            </Popup>
          )}
        </div>
      </Box>

      <Dialog
  open={dialogOpen}
  onClose={handleCloseDialog} // Call handleCloseDialog when dialog is closed
>
  <DialogTitle> Rating for {selectedMaterial && selectedMaterial.label}</DialogTitle>
  <DialogContent>
    <DialogContentText>
    Rating  {selectedMaterial && selectedMaterial.label} material has successfully being submitted
    </DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button
  onClick={handleCloseDialog}
  sx={{
    backgroundColor: 'darkblue', // Background color
    color: '#ffffff', // Text color
    borderRadius: '20px', // Border radius
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#1b6698', // Background color on hover
      color: '#000000', // Text color on hover
    },
  }}
>
  Close
</Button>

  </DialogActions>
</Dialog>

      
    </Box>
  );
}

export default Mat;
