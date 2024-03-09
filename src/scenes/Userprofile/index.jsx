// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataInvoices } from "../../data/mockData";
// import Header from "../../components/Header";

// const Invoices = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const columns = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "cost",
//       headerName: "Cost",
//       flex: 1,
//       renderCell: (params) => (
//         <Typography color={colors.greenAccent[500]}>
//           ${params.row.cost}
//         </Typography>
//       ),
//     },
//     {
//       field: "date",
//       headerName: "Date",
//       flex: 1,
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="INVOICES" subtitle="List of Invoice Balances" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
//       </Box>
//     </Box>
//   );
// };

// export default Invoices;


// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import Header from "../../components/Header";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const Profile = () => {
//   const [editableName, setEditableName] = useState("John Doe");
//   const [isEditing, setIsEditing] = useState(false);

//   const profileInfo = {
//     phoneNumber: "123-456-7890",
//     email: "john.doe@example.com",
//     address: "123 Main Street, Cityville",
//   };

//   const handleEditName = () => {
//     setIsEditing(true);
//   };

//   const handleSaveName = () => {
//     setIsEditing(false);
//     // You can add logic here to save the updated name to your backend or state management.
//   };

//   return (
//     <Container>
//       <Header title="PROFILE" subtitle="User Information" />
//       <Row className="mt-4">
//         <Col>
//           <div className="profile-info">
//             <div className="info-item">
//               <label className="info-label">Name:</label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={editableName}
//                   onChange={(e) => setEditableName(e.target.value)}
//                 />
//               ) : (
//                 <span className="info-value">{editableName}</span>
//               )}
//               {isEditing ? (
//                 <Button
//                   variant="outline-success"
//                   onClick={handleSaveName}
//                 >
//                   Save
//                 </Button>
//               ) : (
//                 <Button
//                   variant="outline-primary"
//                   onClick={handleEditName}
//                 >
//                   Edit
//                 </Button>
//               )}
//             </div>
//             <div className="info-item">
//               <label className="info-label">Phone Number:</label>
//               <span className="info-value">{profileInfo.phoneNumber}</span>
//             </div>
//             <div className="info-item">
//               <label className="info-label">Email:</label>
//               <span className="info-value">{profileInfo.email}</span>
//             </div>
//             <div className="info-item">
//               <label className="info-label">Address:</label>
//               <span className="info-value">{profileInfo.address}</span>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Profile;


// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import Header from "../../components/Header";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const Profile = () => {
//   const [editableInfo, setEditableInfo] = useState({
//     name: "John Doe",
//     phoneNumber: "123-456-7890",
//     email: "john.doe@example.com",
//     address: "123 Main Street, Cityville",
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // You can add logic here to save the updated info to your backend or state management.
//   };

//   const renderInfoItem = (label, valueKey) => (
//     <div className="info-item">
//       <label className="info-label">{label}:</label>
//       {isEditing ? (
//         <input
//           type="text"
//           value={editableInfo[valueKey]}
//           onChange={(e) =>
//             setEditableInfo((prevInfo) => ({
//               ...prevInfo,
//               [valueKey]: e.target.value,
//             }))
//           }
//         />
//       ) : (
//         <span className="info-value">{editableInfo[valueKey]}</span>
//       )}
//     </div>
//   );

//   return (
//     <Container>
//       <Header title="PROFILE" subtitle="User Information" />
//       <Row className="mt-4">
//         <Col>
//           <div className="profile-info">
//             {renderInfoItem("Name", "name")}
//             {renderInfoItem("Phone Number", "phoneNumber")}
//             {renderInfoItem("Email", "email")}
//             {renderInfoItem("Address", "address")}
//             {isEditing ? (
//               <Button
//                 variant="outline-success"
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             ) : (
//               <Button
//                 variant="outline-primary"
//                 onClick={handleEdit}
//               >
//                 Edit
//               </Button>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Profile;

// Import React and necessary components
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import Header from "../../components/Header";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";

// // Import the CSS file
// import "./profile.css";
// import Topbar from "../global/Topbar";
// import Sidebar from "../global/Sidebar";

// const Profile = () => {
//   const [editableInfo, setEditableInfo] = useState({
//     name: "John Doe",
//     phoneNumber: "123-456-7890",
//     email: "john.doe@example.com",
//     address: "123 Main Street, Cityville",
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // You can add logic here to save the updated info to your backend or state management.
//   };

//   const renderInfoItem = (label, valueKey) => (
//     <div className="info-item">
//       <label className="info-label">{label}:</label>
//       {isEditing ? (
//         <input
//           type="text"
//           value={editableInfo[valueKey]}
//           onChange={(e) =>
//             setEditableInfo((prevInfo) => ({
//               ...prevInfo,
//               [valueKey]: e.target.value,
//             }))
//           }
//         />
//       ) : (
//         <span className="info-value">{editableInfo[valueKey]}</span>
//       )}
//     </div>
//   );

//   return (
//     <Box display="flex" >
//       <Sidebar />
//       <Header title="PROFILE" subtitle="User Information" />
     
//       <Row className="infor">
//         <Col>
//           <div className="profile-info">
//             {renderInfoItem("Name", "name")}
//             {renderInfoItem("Phone Number", "phoneNumber")}
//             {renderInfoItem("Email", "email")}
//             {renderInfoItem("Address", "address")}
//             {isEditing ? (
//               <Button
//                 variant="outline-success"
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             ) : (
//               <Button
//                 variant="outline-primary"
//                 onClick={handleEdit}
//               >
//                 Edit
//               </Button>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Box >
//   );
// };

// export default Profile;

// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import Header from "../../components/Header";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";

// // Import the CSS file
// import "./profile.css";
// import Topbar from "../global/Topbar";
// import Sidebar from "../global/Sidebar";

// const Profile = () => {
//   const [editableInfo, setEditableInfo] = useState({
//     name: "John Doe",
//     phoneNumber: "123-456-7890",
//     email: "john.doe@example.com",
//     address: "123 Main Street, Cityville",
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // You can add logic here to save the updated info to your backend or state management.
//   };

//   const renderInfoItem = (label, valueKey) => (
//     <div className="info-item">
//       <label className="info-label">{label}:</label>
//       {isEditing ? (
//         <input
//           type="text"
//           value={editableInfo[valueKey]}
//           onChange={(e) =>
//             setEditableInfo((prevInfo) => ({
//               ...prevInfo,
//               [valueKey]: e.target.value,
//             }))
//           }
//         />
//       ) : (
//         <span className="info-value">{editableInfo[valueKey]}</span>
//       )}
//     </div>
//   );

//   const renderProfilePicture = () => (
//     <div className="profile-picture">
//       {/* Replace the src attribute with the actual URL or source of the user's profile picture */}
//       <img src="https://via.placeholder.com/150" alt="Profile" />
//     </div>
//   );

//   return (
//     <Box className="view" display="flex">
//       <Sidebar />
//       <Header title="PROFILE" subtitle="User Information" />
//       <Container>
        
//         <Row className="infor">
//           <Col md={4}>
//             {renderProfilePicture()}
//             <div>
//               {isEditing ? (
//                 <Button variant="outline-success" onClick={handleSave}>
//                   Save
//                 </Button>
//               ) : (
//                 <Button variant="outline-primary" onClick={handleEdit}>
//                   Edit
//                 </Button>
//               )}
//             </div>
//           </Col>
//           <Col md={8}>
//             <div className="profile-info">
//               {renderInfoItem("Name", "name")}
//               {renderInfoItem("Phone Number", "phoneNumber")}
//               {renderInfoItem("Email", "email")}
//               {renderInfoItem("Address", "address")}
          
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </Box>
//   );
// };

// export default Profile;


import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

// Import the CSS file
import "./profile.css";
const Profile = () => {
  const [editableInfo, setEditableInfo] = useState({
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Main Street, Cityville",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic here to save the updated info to your backend or state management.
  };

  const handleImageChange = (e) => {
    console.log("1")
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
    console.log("hi")
    if (!isEditing) {
      handleEdit(); // Enable editing when clicking the image
    } else {
      // Programmatically click the file input
      fileInputRef.current.click();
    }
  };

  const renderInfoItem = (label, valueKey) => (
    <div className="info-item">
      <label className="info-label">{label}:</label>
      {isEditing ? (
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
        <span className="info-value">{editableInfo[valueKey]}</span>
      )}
    </div>
  );

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
        <img src={profilePicture} alt="Profile" />
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
      <Sidebar />
      <Header title="PROFILE" subtitle="User Information" />
      <Container>
        <Row className="infor">
          <Col md={4}>
            {renderProfilePicture()}
            <div>
              {isEditing ? (
                <Button className="Bp" variant="outline-success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button  className="Bp" variant="outline-primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </div>
          </Col>
          <Col md={8}>
            <div className="profile-info">
              {renderInfoItem("Name", "name")}
              {renderInfoItem("Phone Number", "phoneNumber")}
              {renderInfoItem("Email", "email")}
              {renderInfoItem("Address", "address")}
            </div>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Profile;
