import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import profileImage from "../../assets/profile.png";
import "./profile.css";

const Profile = () => {
  const [editableInfo, setEditableInfo] = useState({
    fullname: "wasan subaihi",
    languages: ["English"],
    email: "wasan@example.com",
    country: "Jordan",
    city: "Amman",
    birthday: "27/2/2001",
    phone: "0792686028",
    gender: "Female",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profileImage);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save updated info
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
      const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
                multiple
                value={editableInfo.languages}
                onChange={handleLanguageChange}
                style={{ width: "180px" }} 
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
      const options = valueKey === "country" ? ["Jordan", "USA", "UK", "France"] : ["Amman", "New York", "London", "Paris"];
    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
                value={editableInfo[valueKey]}
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
      const genderOptions = ["Female", "Male"];
    
      return (
        <div className="info-item">
          <h6 className="info-label">{label}:</h6>
          <h6 className="info-value">
            {isEditing || isEditingInfo ? (
              <select
                value={editableInfo[valueKey]}
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
          src={profilePicture}
          alt="Profile"
          style={{ width: "180px", height: "190px", borderRadius: "10%",marginLeft:"-4px",alignContent:"center",marginTop:"30px" }}
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
                 
                  <div className="isedit">
                    {isEditingInfo ? (
                      <Button className="Bp" variant="outline-success" onClick={handleSaveInfo}>
                        Save
                      </Button>
                    ) : (
                      <Button className="Bp" variant="outline-primary" onClick={handleEditInfo}>
                        Edit
                      </Button>
                    )}
                  </div>
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
