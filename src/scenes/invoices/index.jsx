import React, { useState, useEffect } from "react";
import axios from "axios";
import "./intrest.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Interest = () => {
  const [interest, setInterest] = useState("");
  const [interestsList, setInterestsList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchInterests(); // Fetch interests when component mounts
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
        const token = localStorage.getItem('token');
        const res = await axios.post("http://localhost:3001/userdata", { token });
        const username = res.data.data.Username;

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
      setDeleteId(id);
      setShowDeleteModal(true);
    } catch (error) {
      console.error('Error deleting interest:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/interest/${deleteId}`);
      fetchInterests(); // Fetch interests after deleting an interest
    } catch (error) {
      console.error('Error deleting interest:', error);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
      <div className="work-overlay">
        <div className="work-content">
          <h3>Are you sure you want to delete this interest?</h3>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
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
      <DeleteModal
        show={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Interest;
