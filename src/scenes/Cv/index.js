import React, { useState , useRef, useEffect } from 'react';
import './cvstyles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon ,faDownload } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';
import { Box } from "@mui/material";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Axios from "axios";
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
  const [userLanguages, setUserLanguages] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPhone, setuserPhone] = useState('');
  const [userphoto, setuserphoto] = useState('');
  const [userintreset, setuserintreset] = useState([]);
  const [userskill, setuserskill] = useState([]);
  const [usercity, setusercity] = useState('');
  const [usercountry, setusercountry] = useState('');
  const [userposition, setuserposition] = useState([]);
  const [usercompany, setusercompany] = useState([]);
  const [userstartdate, setuserstartdate] = useState([]);
  const [userenddate, setuserenddate] = useState([]);
  const [useruni, setuseruni] = useState([]);
  const [usergpa, setusergpa] = useState([]);
  const [usergraddate, setusergraddate] = useState([]);
  const [usermajor, setusermajor] = useState([]);
  const [useraward, setuseraward] = useState([]);
  const [userawardsource, setuserawardsource] = useState([]);
  const [usersoft, setusersoftskills] = useState([]);


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.post("http://localhost:3001/userdata", { token });
      const userData = response.data.data;
      const userLanguages = userData.languages;
      const username = userData.FullName;
      const userEmail = userData.Email;
      const userPhone = userData.phone;
      const userphoto = userData.profilePicture;
      const usercity= userData.city;
      const usercountry= userData.country;
      setusercountry(usercountry)
      setusercity(usercity)
      setuserphoto(userphoto)
      setUserLanguages(userLanguages);
      setUserName(username);
      setuserEmail(userEmail)
      setuserPhone(userPhone)
    
      const loggedInUsername = response.data.data.Username;
  
      // Include loggedInUsername in the request headers
      const interestresponse = await Axios.get('http://localhost:3001/interest', {
        headers: {
          'Username': loggedInUsername
        }
      });
      const skillresponse = await Axios.get('http://localhost:3001/skill', {
        headers: {
          'Username': loggedInUsername
        }
      });

      const workresponse = await Axios.get('http://localhost:3001/work', {
        headers: {
          'Username': loggedInUsername
        }
      });
      const filteredwork = workresponse.data.filter(item => item.username === loggedInUsername);
      const userposition = filteredwork.map(item => item.position);
      const usercompany = filteredwork.map(item => item.company);
      const userstartdate = filteredwork.map(item => item.startDate);
      const userenddate = filteredwork.map(item => item.endDate);

      console.log(userposition);
      console.log(usercompany); console.log(userstartdate); console.log(userenddate);
      setusercompany(usercompany)
      setuserposition(userposition)
      setuserstartdate(userstartdate)
      setuserenddate(userenddate)

      const filteredInterests = interestresponse.data.filter(item => item.username === loggedInUsername);
      const userintreset = filteredInterests.map(item => item.interest);
      setuserintreset(userintreset)


      const filteredskill = skillresponse.data.filter(item => item.username === loggedInUsername);
      const userskill = filteredskill.map(item => item.name);
      setuserskill(userskill)


      const eduresponse = await Axios.get('http://localhost:3001/education', {
        headers: {
          'Username': loggedInUsername
        }
      });
      const filterededu = eduresponse.data.filter(item => item.username === loggedInUsername);
      const usergpa = filterededu.map(item => item.gpa);
      const useruni = filterededu.map(item => item.university);
      const usergraddate = filterededu.map(item => item.graduationDate);
      const usermajor = filterededu.map(item => item.major);
      setusergpa(usergpa)
      setuseruni(useruni)
      setusergraddate(usergraddate)
      setusermajor(usermajor)
  

      const awardresponse = await Axios.get('http://localhost:3001/award', {
        headers: {
          'Username': loggedInUsername
        }
      });
      const filteredaward = awardresponse.data.filter(item => item.username === loggedInUsername);
      const useraward = filteredaward.map(item => item.name);
      const userawardsource = filteredaward.map(item => item.source);
    
      setuseraward(useraward)
      setuserawardsource(userawardsource)


      
      const softresponse = await Axios.get(`http://localhost:3001/user-checkboxes/${loggedInUsername}`);
    
    // Check if the response data has a 'checkboxes' array
    if (softresponse.data && Array.isArray(softresponse.data.checkboxes)) {
      // Map the checkboxes array to extract labels
      const usersoft = softresponse.data.checkboxes.map(item => item.label);
      setusersoftskills(usersoft);}
   
 console.log(usersoft)
  

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
          <div className={`resume ${darkTheme ? 'dark-theme' : ''}` } ref={cvRef}>
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
                  <img src={userphoto} alt="Profile" className="p-picture" />
                  <div className="personal-info">
                    <p>{userName}</p>
                    <p>{userEmail}</p> {/* Replace with actual email */}
                    <p>{userPhone}</p> {/* Replace with actual phone number */}
                    <p>{usercity}, {usercountry}</p>
                  </div>
                  <br></br>
                  <br></br>
                </div>
                <div className="section">
                  <h2>INTERESTS</h2>
                  <ol className="star-list">
                    {userintreset.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ol>
                </div>
                <div className="section">
                  <h2>SKILLS</h2>
                  <ol className='olcv1'>
                    {userskill.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                    {usersoft.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ol>
                </div>
                <div className="section">
                  <h2>LANGUAGES</h2>
                  <ul className='olcv2'>
                    {userLanguages.map((lang, index) => (
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
                {usercompany.map((company, index) => (
        <li key={index}>
          {company} - {userposition[index]} / {formatDate(userstartdate[index])} - {formatDate(userenddate[index])}
        </li>
                  ))}
                </ol>
              </div> 
              <div className="section1">
                <h2>EDUCATION</h2>
                <ul className="connected-list">
                {useruni.map((university, index) => (
        <li key={index}>
          {university} -{usermajor[index]} / {usergraddate[index]} 
          <br></br>
          GPA : {usergpa[index]} /4
        </li>
                  ))}
                </ul>
              </div>
              <div className="section1">
                <h2>AWARDS</h2>
                <ul className="connected-list">
                {useraward.map((award, index) => (
        <li key={index}>
          {award} -{userawardsource[index]} 
        </li>
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
