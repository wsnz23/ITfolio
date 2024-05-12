import React, { useState, useEffect } from "react";
import axios from "axios";
import "./intrest.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Invoices = () => {
  const [interest, setInterest] = useState("");
  const [interestsList, setInterestsList] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch username from token when component mounts
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post("http://localhost:3001/userdata", { token });
        setUsername(res.data.data.Username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
    fetchInterests(); // Fetch interests after obtaining the username
  }, []);

  const fetchInterests = async () => {
    try {
      // Fetch username from token
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;
  
      // Include loggedInUsername in the request headers
      const response = await axios.get('http://localhost:3001/interest', {
        headers: {
          'Username': loggedInUsername
        }
      });
  
      // Filter interests to include only those belonging to the logged-in user
      const filteredInterests = response.data.filter(item => item.username === loggedInUsername);
  
      setInterestsList(filteredInterests);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };
  

  const handleInputChange = (event) => {
    setInterest(event.target.value);
  };

  const handleAddInterest = async () => {
    if (interest.trim() !== "") {
      try {
        // Include username in the request data
        await axios.post('http://localhost:3001/interest', { username, interest });
        setInterest(""); // Clear the input box after adding the interest
        fetchInterests(); // Fetch interests after adding a new interest
      } catch (error) {
        console.error('Error adding interest:', error);
      }
    }
  };

  const handleDeleteInterest = async (id) => {
    try {
      
      console.log(id)
      await axios.delete(`http://localhost:3001/interest/${id}`);
      fetchInterests(); // Fetch interests after deleting an interest
    } catch (error) {
      console.error('Error deleting interest:', error);
    }
  };
  

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="intrest-container">
        <h2 className="settings-title">Interest</h2>
        <input
          type="text"
          placeholder="  Enter your interest"
          value={interest}
          onChange={handleInputChange}
          className="interset-input"
        />
        <button className="intersetbutton" onClick={handleAddInterest}><i className="fa fa-plus-circle"></i> Add Interest</button>
        <br /><br />
        <ul className="interests-list">
          {interestsList.map((item, index) => (
            <li key={index}>
              {item.interest}
              <button className="interestdel" onClick={() => handleDeleteInterest(item._id)}><i className="fa fa-trash"></i> Delete</button>
              <br></br> <br></br>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoices;
