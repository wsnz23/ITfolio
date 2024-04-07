import React, { useState , useRef } from 'react';
import './cvstyles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon ,faDownload } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';
import { Box } from "@mui/material";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import profileImage from "../../assets/profile.png";

const fakeData = {
  fullName: "......",
  email: ".......@example.com",
  phoneNumber: "......",
  address: "123 Main St, City, Country",
  profilePicture: profileImage, // Placeholder image URL
  workExperience: ["Job 1", "Job 2", "Job 3"],
  education: ["Degree 1", "Degree 2", "Degree 3"],
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  interests: ["Interest 1", "Interest 2", "Interest 3"],
  languages: ["Language 1", "Language 2", "Language 3"],
  awards: ["An online space to explore words, ideas and new writing commissioned and produced by National Centre for Writing. Whether you are looking for long or short reads on the craft of writing; interviews with emerging writers and published authors on The Writing Life Podcast; real and imagined explorations of Norwich UNESCO City of Literature or dynamic new insights into literature, ideas, and creative writing; we have a vast digital library of content for you to read, listen to and watch below.", "Award 2", "Award 3"]
};


const Resume = () => {
  const cvRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };
  const handleDownload = () => {
    const cvElement = cvRef.current;
    
    // Hide the buttons before capturing the canvas
    const downloadButton = cvElement.querySelector('.download-btn');
    const themeButton = cvElement.querySelector('.theme-toggle');
    if (downloadButton) downloadButton.style.display = 'none';
    if (themeButton) themeButton.style.display = 'none';
  
    html2canvas(cvElement).then(canvas => {
      // Restore the visibility of the buttons after capturing the canvas
      if (downloadButton) downloadButton.style.display = 'block';
      if (themeButton) themeButton.style.display = 'block';
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'JPG', 0, 0, imgWidth, imgHeight);
      pdf.save('cv.pdf');
    }).catch(error => {
      console.error('Error capturing CV:', error);
    });
  };
  
  return (
    <Box className="view"  display="flex" >
   <Topbar/>
   <Sidebar/>
      <Box flex="1" overflow="auto">
      <div className="cv-container">
    <div className={`resume ${darkTheme ? 'dark-theme' : ''}` }ref={cvRef}>
      <div className='cont'>
      <button className="theme-toggle" onClick={toggleTheme}>
        <FontAwesomeIcon icon={darkTheme ? faMoon : faSun} />
      </button>
      <button className="download-btn" onClick={handleDownload}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      </div>
      <div className="sidebar">
        <div className="main-content">
          <div className="top-section">
            <img src={fakeData.profilePicture} alt="Profile" className="p-picture" />
            <div className="personal-info">
              <h2>{fakeData.fullName}</h2>
              <p>{fakeData.email}</p>
              <p>{fakeData.phoneNumber}</p>
            </div>
          </div>
          <br></br><br></br><br></br>
          <div className="section">
  <h2>INTERESTS</h2>
  <ol className="star-list">
    {fakeData.interests.map((interest, index) => (
      <li key={index}>{interest}</li>
    ))}
  </ol>
</div>
          <br></br><br></br><br></br>
          <div className="section">
            <h2>SKILLS</h2>
            <ol className='olcv1'>
              {fakeData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ol>
          </div>
          <br></br><br></br><br></br>
          <div className="section">
          <h2>LANGUAGES</h2>
          <ul className='olcv2'>
            {fakeData.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>
        </div>
      </div> 
      <div className="side-section">
        <div className="section1">
          <h2>work Experience</h2>
          <ol className="connected-list">
            {fakeData.workExperience.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ol>
        </div> 
        <br></br><br></br><br></br>
        <div className="section1">
          <h2>EDUCATION</h2>
          <ul className="connected-list">
            {fakeData.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </div>
        <br></br><br></br><br></br>
        <div className="section1">
          <h2>AWARDS</h2>
          <ul className="connected-list">
    {fakeData.awards.map((award, index) => (
      <li key={index}>{award}</li>
    ))}
  </ul>
        </div>
       
       
      </div>
    </div>
    </div>
    </Box>
    </Box>
  );
            }
  
export default Resume;
