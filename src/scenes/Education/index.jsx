
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import './education.css';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Education = () => {
  const [educationHistory, setEducationHistory] = useState([]);
  const [newEducation, setNewEducation] = useState({ university: '', major: '', graduationDate: '' ,gpa:''});
  const [editIndex, setEditIndex] = useState(null);

  const majorInputRef = useRef(null);

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch education data from the backend when component mounts
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      // Fetch username from token
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;
  
      // Include loggedInUsername in the request headers
      const response = await axios.get('http://localhost:3001/education', {
        headers: {
          'Username': loggedInUsername
        }
      });
  
      // Filter interests to include only those belonging to the logged-in user
      const filterededu = response.data.filter(item => item.username === loggedInUsername);
  
      setEducationHistory(filterededu);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const handleAddRow = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token); // Log the token to check if it's correct
      // Fetch user data using the token
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;
  
      // Include username in the newEducation object
      const educationData = { ...newEducation, username };
  
      if (editIndex !== null) {
        // If editIndex is not null, it means we are editing an existing row
        const updatedHistory = [...educationHistory];
        updatedHistory[editIndex] = educationData; // Update the existing row with edited data
        setEducationHistory(updatedHistory); // Update education history state with updated data
  
        // Make PATCH request to update education data in the database
        await axios.patch(`http://localhost:3001/education/${educationHistory[editIndex]._id}`, educationData);
        
        // Reset editIndex and newEducation state
        setEditIndex(null);
        setNewEducation({ university: '', major: '', graduationDate: '' ,gpa:''});
      } else {
        // If editIndex is null, it means we are adding a new row
        // Make POST request to add new education data
        const response = await axios.post('http://localhost:3001/education', educationData);
        setEducationHistory([...educationHistory, response.data]); // Update education history state with newly added data
        setNewEducation({ university: '', major: '', graduationDate: '',gpa:'' }); // Clear input fields
      }
    } catch (error) {
      console.error('Error adding education data:', error);
    }
  };
  
  

  const handleEditRow = (index) => {
    const editData = educationHistory[index];
    setNewEducation(editData);
    setEditIndex(index);
  };

  const handleRemoveRow = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:3001/education/${id}`); // Use the document ID for deletion
      const updatedHistory = educationHistory.filter((item) => item._id !== id); // Filter out the deleted record
      setEducationHistory(updatedHistory); // Update education history state after deletion
    } catch (error) {
      console.error('Error deleting education data:', error);
    }
  };
  

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="edu-container">
        <h2>Education</h2>
        <div>
          <input
            type="text"
            name="university"
            value={newEducation.university}
            onChange={handleChange}
            placeholder=" University"
            className='work-input'
          />
          <input
            type="text"
            name="major"
            value={newEducation.major}
            onChange={handleChange}
            placeholder=" Major"
            ref={majorInputRef}
            className='work-input'
          />
          <input
            type="number"
            name="graduationDate"
            value={newEducation.graduationDate}
            onChange={handleChange}
            placeholder=" Graduation Date"
            min="1900"
            max={(new Date()).getFullYear()}
            className='work-input'
          />
             <input
            type="text"
            name="gpa"
            value={newEducation.gpa}
            onChange={handleChange}
            placeholder=" GPA out of 4"
            className='work-input'
          />
          <br /><br />
          <button style={{ textAlign: 'center', marginLeft: '300px' }} className='intersetbutton' onClick={handleAddRow}>
  {editIndex !== null ? <><i className="fa fa-save"></i> Save</> : <> <i className="fa fa-plus-circle"></i> Add</>}
</button>
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>University</th>
              <th>Major</th>
              <th>Graduation Date (Year)</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.university}</td>
                <td>{item.major}</td>
                <td>{item.graduationDate}</td>
                <td>{item.gpa}</td>
                <td>
                  <button className='intersetbutton' onClick={() => handleEditRow(index)}><i className="fa fa-edit"></i> Edit</button>
                  <button className='intersetbutton' onClick={() => handleRemoveRow(item._id)}><i className="fa fa-trash"></i> Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Education;

