import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./workexperince.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Contacts = () => {
  const [workHistory, setWorkHistory] = useState([]);
  const [newWork, setNewWork] = useState({ company: '', position: '', startDate: '', endDate: '' });
  const [editIndex, setEditIndex] = useState(null);

  const positionInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewWork((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchWorkHistory();
  }, []);

    
    const fetchWorkHistory = async () => {
      try {
        // Fetch username from token
        const token = localStorage.getItem('token');
        const res = await axios.post("http://localhost:3001/userdata", { token });
        const loggedInUsername = res.data.data.Username;
    
        // Include loggedInUsername in the request headers
        const response = await axios.get('http://localhost:3001/work', {
          headers: {
            'Username': loggedInUsername
          }
        });
    
        const filteredWork = response.data.filter(item => item.username === loggedInUsername);

        // Format work history data
        const formattedWorkHistory = filteredWork.map(work => ({
          ...work,
          startDate: work.startDate ? new Date(work.startDate).toISOString().split('T')[0] : '', // Convert and format the start date
          endDate: work.endDate ? new Date(work.endDate).toISOString().split('T')[0] : '' // Convert and format the end date
        }));
    
        // Set the state with combined data
        setWorkHistory(formattedWorkHistory);
       
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

  const handleAddRow = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;
  
      const newWorkData = { ...newWork, username };
  
      if (editIndex !== null) {
        // If editIndex is not null, it means we are editing an existing row
        const updatedHistory = [...workHistory];
        updatedHistory[editIndex] = newWorkData; // Update the existing row with edited data
        setWorkHistory(updatedHistory); // Update work history state with updated data
  
        // Make PATCH request to update work data in the database
        await axios.patch(`http://localhost:3001/work/${workHistory[editIndex]._id}`, newWorkData);
  
        // Reset editIndex and newWork state
        setEditIndex(null);
        setNewWork({ company: '', position: '', startDate: '', endDate: '' });
      } else {
        // If editIndex is null, it means we are adding a new row
        // Make POST request to add new work data
        const response = await axios.post('http://localhost:3001/work', newWorkData);
        setWorkHistory([...workHistory, response.data]); // Update work history state with newly added data
        setNewWork({ company: '', position: '', startDate: '', endDate: '' }); // Clear input fields
      }
      await fetchWorkHistory();
    } catch (error) {
      console.error('Error adding work history:', error);
    }
  };
  
  const handleEditRow = (index) => {
    const editData = workHistory[index];
    setNewWork(editData);
    setEditIndex(index);
  };
  

  const handleRemoveRow = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/work/${id}`);
      const updatedWorkHistory = workHistory.filter((work) => work._id !== id);
      setWorkHistory(updatedWorkHistory);
      await fetchWorkHistory();
    } catch (error) {
      console.error('Error deleting work history:', error);
    }
  };

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="work-container">
        <h2>Work History</h2>
        <div>
          <input
            type="text"
            name="company"
            value={newWork.company}
            onChange={handleChange}
            placeholder=" Company"
            className='work-input'
          />
          <input
            type="text"
            name="position"
            value={newWork.position}
            onChange={handleChange}
            placeholder=" Position"
            ref={positionInputRef}
            className='work-input'
          />
     
          <input
            type="date"
            name="startDate"
            value={newWork.startDate}
            onChange={handleChange}
            placeholder=" Start Date"
            className='work-input'
          />
          
          <input
            type="date"
            name="endDate"
            value={newWork.endDate}
            onChange={handleChange}
            placeholder=" End Date"
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
              <th>Company</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workHistory.map((work, index) => (
              <tr key={index}>
                <td>{work.company}</td>
                <td>{work.position}</td>
                <td>{work.startDate}</td>
                <td>{work.endDate}</td>
                <td>
                  <button className='intersetbutton' onClick={() => handleEditRow(index)}><i className="fa fa-edit"></i> Edit</button>
                  <button className='intersetbutton' onClick={() => handleRemoveRow(work._id)}><i className="fa fa-trash"></i> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
