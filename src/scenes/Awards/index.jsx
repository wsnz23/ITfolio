import React, { useState, useEffect } from "react";
import axios from "axios";
import "./awards.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Awards = () => {
  const [awardhistory, setawardhistory] = useState([]);
  const [newaward, setnewaward] = useState({ name: '', source: ''});
  const [skillhistory, setskillhistory] = useState([]);
  const [newskill, setnewskill] = useState({ name: '', source: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editIndexSkill, setEditIndexSkill] = useState(null);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setnewaward((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleskillchange = (event) => {
    const { name, value } = event.target;
    setnewskill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    fetchaward();
    fetchSkills();
  }, []);

  const fetchaward = async () => {
    try {
      // Fetch username from token
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;
  
      // Include loggedInUsername in the request headers
      const response = await axios.get('http://localhost:3001/award', {
        headers: {
          'Username': loggedInUsername
        }
      });
  
      // Filter interests to include only those belonging to the logged-in user
      const filteraward = response.data.filter(item => item.username === loggedInUsername);
  
      setawardhistory(filteraward);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const fetchSkills= async () => {
    try {
      // Fetch username from token
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;
  
      // Include loggedInUsername in the request headers
      const response = await axios.get('http://localhost:3001/skill', {
        headers: {
          'Username': loggedInUsername
        }
      });
  
      // Filter interests to include only those belonging to the logged-in user
      const filteredskill = response.data.filter(item => item.username === loggedInUsername);
  
      setskillhistory(filteredskill);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const handleAddAward = async()  => {
    try {
      const token = localStorage.getItem('token');
      console.log(token); // Log the token to check if it's correct
      // Fetch user data using the token
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;
  
      // Include username in the newEducation object
      const awarddata = { ...newaward, username };
  
      if (editIndex !== null) {
        // If editIndex is not null, it means we are editing an existing row
        const updatedHistory = [...awardhistory];
        updatedHistory[editIndex] = awarddata; // Update the existing row with edited data
        setawardhistory(updatedHistory); // Update education history state with updated data
  
        // Make PATCH request to update education data in the database
        await axios.patch(`http://localhost:3001/award/${awardhistory[editIndex]._id}`, awarddata);
        
        // Reset editIndex and newEducation state
        setEditIndex(null);
        setnewaward({ name: '', source: ''});
      } else {
        // If editIndex is null, it means we are adding a new row
        // Make POST request to add new education data
        const response = await axios.post('http://localhost:3001/award', awarddata);
        setawardhistory([...awardhistory, response.data]); // Update education history state with newly added data
        setnewaward({ name: '', source: '' }); // Clear input fields
      }
    } catch (error) {
      console.error('Error adding education data:', error);
    }
  };

  const handleEditAward = (index) => {
    const editData = awardhistory[index];
    setnewaward(editData);
    setEditIndex(index);
  };

 

  const handleDeleteAward = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:3001/award/${id}`); // Use the document ID for deletion
      const updatedHistory = awardhistory.filter((item) => item._id !== id); // Filter out the deleted record
      setawardhistory(updatedHistory); // Update education history state after deletion
    } catch (error) {
      console.error('Error deleting education data:', error);
    }
  };

  const handleAddSkill = async () => {
    try {
      // Fetch user data using the token
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;
  
      // Include username in the newSkill object
      const skilldata = { ...newskill, username };
  
      if (editIndexSkill !== null) {
        // If editIndexSkill is not null, it means we are editing an existing row
        const updatedHistory = [...skillhistory];
        updatedHistory[editIndexSkill] = skilldata;
        setskillhistory(updatedHistory); // Update skill history state with updated data
  
        // Make PATCH request to update skill data in the database
        await axios.patch(`http://localhost:3001/skill/${skillhistory[editIndexSkill]._id}`, skilldata);
  
        // Reset editIndexSkill and newSkill state
        setEditIndexSkill(null);
        setnewskill({ name: '', source: '' });
      } else {
        // If editIndexSkill is null, it means we are adding a new row
        // Make POST request to add new skill data
        const response = await axios.post('http://localhost:3001/skill', skilldata);
        setskillhistory([...skillhistory, response.data]); // Update skill history state with newly added data
        setnewskill({ name: '', source: '' }); // Clear input fields
      }
    } catch (error) {
      console.error('Error adding skill data:', error);
    }
  };
  
  const handleEditSkill = (index) => {
    const editData = skillhistory[index];
    setnewskill(editData);
    setEditIndexSkill(index); // Use setEditIndexSkill to set the index for skill editing
  };
  

  const handleDeleteSkill = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:3001/skill/${id}`); // Use the document ID for deletion
      const updatedHistory = skillhistory.filter((item) => item._id !== id); // Filter out the deleted record
      setskillhistory(updatedHistory); // Update education history state after deletion
    } catch (error) {
      console.error('Error deleting education data:', error);
    }
  };




  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="skill-container">
        <h2 className="settings-title">Skills</h2>
        <div className="add-skill">
          <input
            type="text"
            name="name"
            placeholder=" Skill Name"
            value={newskill.name}
            onChange={handleskillchange}
            className='work-input'
          />
          <input
            type="text"
            name="source"
            placeholder=" Source"
            value={newskill.source}
            onChange={handleskillchange}
            className='work-input'
          />
          <br></br>
          <br></br>
          
          <button style={{ textAlign: 'center', marginLeft: '220px' }} className='intersetbutton' onClick={handleAddSkill}>
  {editIndexSkill !== null ? <><i className="fa fa-save"></i> Save</> : <> <i className="fa fa-plus-circle"></i> Add</>}</button>
        </div>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skillhistory.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>
                <td>{skill.source}</td>
                <td>
                  <button className='intersetbutton' onClick={() => handleEditSkill(index)}><i className="fa fa-edit"></i> Edit</button>
                  <button className='intersetbutton' onClick={() => handleDeleteSkill(skill._id)}><i className="fa fa-trash"></i> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="skill-container">
        <h2 className="settings-title">Awards</h2>
        <div className="add-award">
        <input
            type="text"
            name="name"
            placeholder=" Award Name"
            value={newaward.name}
            onChange={handlechange}
            className='work-input'
          />
          <input
            type="text"
            name="source"
            placeholder=" Source"
            value={newaward.source}
            onChange={handlechange}
            className='work-input'
          />
                    <br></br>
          <br></br>

        
          <button style={{ textAlign: 'center', marginLeft: '220px' }} className='intersetbutton' onClick={handleAddAward}>
  {editIndex !== null ? <><i className="fa fa-save"></i> Save</> : <> <i className="fa fa-plus-circle"></i> Add</>}</button>
        </div>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Award Name</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {awardhistory.map((award, index) => (
              <tr key={index}>
                <td>{award.name}</td>
                <td>{award.source}</td>
                <td>
                  <button className='intersetbutton' onClick={() => handleEditAward(index)}><i className="fa fa-edit"></i> Edit</button>
                  <button className='intersetbutton' onClick={() => handleDeleteAward(award._id)}><i className="fa fa-trash"></i> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Awards;