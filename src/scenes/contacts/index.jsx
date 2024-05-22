import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./workexperince.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Contacts = () => {
  const [workHistory, setWorkHistory] = useState([]);
  const [newWork, setNewWork] = useState({ company: '', position: '', startDate: '', endDate: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;

      const response = await axios.get('http://localhost:3001/work', {
        headers: {
          'Username': loggedInUsername
        }
      });

      const filteredWork = response.data.filter(item => item.username === loggedInUsername);

      const formattedWorkHistory = filteredWork.map(work => ({
        ...work,
        startDate: work.startDate ? new Date(work.startDate).toISOString().split('T')[0] : '',
        endDate: work.endDate ? new Date(work.endDate).toISOString().split('T')[0] : ''
      }));

      setWorkHistory(formattedWorkHistory);
    } catch (error) {
      console.error('Error fetching work history:', error);
    }
  };

  const handleAddRow = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;

      const newWorkData = { ...newWork, username };

      if (editIndex !== null) {
        const updatedHistory = [...workHistory];
        updatedHistory[editIndex] = newWorkData;
        setWorkHistory(updatedHistory);

        await axios.patch(`http://localhost:3001/work/${workHistory[editIndex]._id}`, newWorkData);

        setEditIndex(null);
        setNewWork({ company: '', position: '', startDate: '', endDate: '' });
      } else {
        const response = await axios.post('http://localhost:3001/work', newWorkData);
        setWorkHistory([...workHistory, response.data]);
        setNewWork({ company: '', position: '', startDate: '', endDate: '' });
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

  const handleRemoveRow = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/work/${deleteId}`);
      const updatedWorkHistory = workHistory.filter((work) => work._id !== deleteId);
      setWorkHistory(updatedWorkHistory);
      await fetchWorkHistory();
    } catch (error) {
      console.error('Error deleting work history:', error);
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
          <h3>Are you sure you want to delete this?</h3>
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
      
      </div>  <DeleteModal
          show={showDeleteModal}
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
    </div>
  );
};

export default Contacts;
