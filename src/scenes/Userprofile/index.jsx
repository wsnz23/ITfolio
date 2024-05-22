import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import profileImage from "../../assets/profile.png";
import "./profile.css";
import Axios from "axios";

const Profile = () => {
  const [editableInfo, setEditableInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    birthday: "",
    gender: "",
    languages: [],
    profilePicture: profileImage,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profileImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token); // Log the token to check if it's correct
      const response = await Axios.post("http://localhost:3001/userdata", { token });
      const userData = response.data.data;
      const useremail = response.data.data.Email;
      const userphone = response.data.data.phone;
      const userfn = response.data.data.FullName;
      const usercity = response.data.data.city;
      const usercountry = response.data.data.country;
      const usergender = response.data.data.gender;
      const userbirth = response.data.data.birthday;
      const userlan= response.data.data.languages;
    // Inside fetchUserData function
const userprofile = response.data.data.profilePicture;

      console.log(userData);
      // Update the editableInfo state object with the fetched data
      setEditableInfo({
        ...userData,
      email: useremail, // Assuming useremail is the variable containing the user's email
      fullname: userfn, // Assuming userfn is the variable containing the user's full name
       phone:userphone,
       languages:userlan,
       country:usercountry,
      city:usercity,
      gender:usergender,
      birthday:userbirth,
      profilePicture:userprofile || profileImage
      });
    
   
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Logic to save updated info
      const token = localStorage.getItem('token');
      const username = editableInfo.Username; // Assuming Username is available in editableInfo
      const pro = editableInfo.profilePicture; // Retrieve profile picture from editableInfo
      
      // Update the profilePicture in the updatedData
      const updatedData = {
        ...editableInfo,
        profilePicture: pro,
      };
  
      // Exclude the password field from the updated data
      const { Password, ...dataToSend } = updatedData;
  
      // Send an update request to the server
      const response = await Axios.put(`http://localhost:3001/updateusers/${username}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you need to send the token in the headers
        },
      });
  
      console.log("Data updated successfully:", response.data);
  
      // Fetch updated data after saving
      await fetchUserData();
  
      // Toggle back to edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle errors here, show an error message to the user, etc.
    }
  };
  
  

  const handleEditInfo = () => {
    setIsEditingInfo(true);
  };

  const handleSaveInfo = () => {
    setIsEditingInfo(false);
    // Logic to save updated additional info
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        
        // Update the profilePicture in editableInfo
        setEditableInfo((prevInfo) => ({
          ...prevInfo,
          profilePicture: reader.result,
        }));
      };
    
      reader.readAsDataURL(file);
    }
  };
  

  const handlePictureClick = () => {
    if (!isEditing) {
      handleEdit();
    } else {
      fileInputRef.current.click();
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setEditableInfo((prevInfo) => ({
      ...prevInfo,
      languages: selectedLanguages,
    }));
  };

  const renderInfoItem = (label, valueKey) => {
    if (valueKey === "languages") {
      const languages = ["English", "Arabic", "Spanish", "Turkish", "Mandarin (Chinese)", "French", "Bengali", "Russian", "Portuguese", "Urdu", "German", "Japanese", "Swahili", "Korean", "Hindi"];

    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
                multiple
                value={editableInfo.languages}
                onChange={handleLanguageChange}
                style={{ width: "180px" ,height:"200px"}} 
              >
                {languages.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>
            ) : (
              editableInfo[valueKey].join(", ")
            )}
          </h6>
        </div>
      );
    } else if (valueKey === "country" || valueKey === "city") {
      const options = valueKey === "country" ? ["","Jordan"] : ["","Amman", "Irbid", "Zarqa", "Salt", "Mafraq", "Karak", "Madaba", "Jerash", "Ajloun", "Aqaba", "Ma'an", "Tafilah"];

    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
                value={editableInfo[valueKey]||""}
                onChange={(e) =>
                  setEditableInfo((prevInfo) => ({
                    ...prevInfo,
                    [valueKey]: e.target.value,
                  }))
                }
                style={{ width: "180px" }} 
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              editableInfo[valueKey]
            )}
          </h6>
        </div>
      );
    } else if (valueKey === "gender") {
      const genderOptions = ["","Female", "Male"];
    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
              value={editableInfo[valueKey] || ""}
                onChange={(e) =>
                  setEditableInfo((prevInfo) => ({
                    ...prevInfo,
                    [valueKey]: e.target.value,
                  }))
                }
                style={{ width: "180px" }} 
              >
                {genderOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              editableInfo[valueKey]
            )}
          </h6>
        </div>
      );
    } else {
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <input
                type="text"
                value={editableInfo[valueKey]}
                onChange={(e) =>
                  setEditableInfo((prevInfo) => ({
                    ...prevInfo,
                    [valueKey]: e.target.value,
                  }))
                }
              />
            ) : (
              editableInfo[valueKey]
            )}
          </h6>
        </div>
      );
    }
  };

  const renderProfilePicture = () => (
    <div className="profile-picture">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        id="profile-picture-input"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="profile-picture-input">
        <img
          src={editableInfo.profilePicture} // Use editableInfo.profilePicture to render the profile picture
          alt="profile"
          style={{ width: "180px", height: "190px", borderRadius: "10%", marginLeft: "-4px", alignContent: "center", marginTop: "30px" }}
        />
        {isEditing && (
          <Button
            variant="outline-secondary"
            className="change-picture-btn"
            onClick={handlePictureClick}
          >
            Change Picture
          </Button>
        )}
      </label>
    </div>
  );
  
  return (
    <Box className="view" display="flex">
      <Topbar />
      <Sidebar />
      <Box flex="1" overflow="auto">
        <h2 className="userinfotitle">User Information</h2>
        <Container>
          <Row className="infor">
            <Col md={8}>
              <div className="profileat">
                <div className="profile-image">{renderProfilePicture()}</div>
                <div className="profile-info">
                  <h6>{renderInfoItem("Full Name", "fullname")}</h6>
                  <h6>{renderInfoItem("Email", "email")}</h6>
                  <h6>{renderInfoItem("Phone Number", "phone")}</h6>
                  <div className="isedit">
                    {isEditing ? (
                      <Button className="Bp" variant="outline-success" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button className="Bp" variant="outline-primary" onClick={handleEdit}>
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="infor">
            <Col md={4}>
              <div className="profileat">
                <div className="profile-infoo">
                  <h6>{renderInfoItem("Country", "country")}</h6>
                  <h6>{renderInfoItem("City", "city")}</h6>
                  <h6>{renderInfoItem("Birthday", "birthday")}</h6>
                  <h6>{renderInfoItem("Gender", "gender")}</h6>
                  <h6>{renderInfoItem("Languages", "languages")}</h6>
                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
