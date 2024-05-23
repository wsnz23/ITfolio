import React, { useState, useEffect } from "react";
import axios from "axios";
import "./awards.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Awards = () => {
  const [awardhistory, setawardhistory] = useState([]);
  const [newaward, setnewaward] = useState({ name: '', source: '' });
  const [skillhistory, setskillhistory] = useState([]);
  const [newskill, setnewskill] = useState({ name: '', source: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editIndexSkill, setEditIndexSkill] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState('');

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
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;

      const response = await axios.get('http://localhost:3001/award', {
        headers: {
          'Username': loggedInUsername
        }
      });

      const filteraward = response.data.filter(item => item.username === loggedInUsername);

      setawardhistory(filteraward);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const loggedInUsername = res.data.data.Username;

      const response = await axios.get('http://localhost:3001/skill', {
        headers: {
          'Username': loggedInUsername
        }
      });

      const filteredskill = response.data.filter(item => item.username === loggedInUsername);

      setskillhistory(filteredskill);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAddAward = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;

      const awarddata = { ...newaward, username };

      if (editIndex !== null) {
        const updatedHistory = [...awardhistory];
        updatedHistory[editIndex] = awarddata;
        setawardhistory(updatedHistory);

        await axios.patch(`http://localhost:3001/award/${awardhistory[editIndex]._id}`, awarddata);

        setEditIndex(null);
        setnewaward({ name: '', source: '' });
      } else {
        const response = await axios.post('http://localhost:3001/award', awarddata);
        setawardhistory([...awardhistory, response.data]);
        setnewaward({ name: '', source: '' });
      }
    } catch (error) {
      console.error('Error adding award data:', error);
    }
  };

  const handleEditAward = (index) => {
    const editData = awardhistory[index];
    setnewaward(editData);
    setEditIndex(index);
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post("http://localhost:3001/userdata", { token });
      const username = res.data.data.Username;

      const skilldata = { ...newskill, username };

      if (editIndexSkill !== null) {
        const updatedHistory = [...skillhistory];
        updatedHistory[editIndexSkill] = skilldata;
        setskillhistory(updatedHistory);

        await axios.patch(`http://localhost:3001/skill/${skillhistory[editIndexSkill]._id}`, skilldata);

        setEditIndexSkill(null);
        setnewskill({ name: '', source: '' });
      } else {
        const response = await axios.post('http://localhost:3001/skill', skilldata);
        setskillhistory([...skillhistory, response.data]);
        setnewskill({ name: '', source: '' });
      }
    } catch (error) {
      console.error('Error adding skill data:', error);
    }
  };

  const handleEditSkill = (index) => {
    const editData = skillhistory[index];
    setnewskill(editData);
    setEditIndexSkill(index);
  };

  const handleRemoveRow = (id, type) => {
    setDeleteId(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === 'award') {
        await axios.delete(`http://localhost:3001/award/${deleteId}`);
        const updatedHistory = awardhistory.filter((item) => item._id !== deleteId);
        setawardhistory(updatedHistory);
      } else if (deleteType === 'skill') {
        await axios.delete(`http://localhost:3001/skill/${deleteId}`);
        const updatedHistory = skillhistory.filter((item) => item._id !== deleteId);
        setskillhistory(updatedHistory);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
      setDeleteType('');
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
    setDeleteType('');
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
      <div className="skill-container">
        <h2 className="settings-title">Technical Skills Aquired from External Sources</h2>
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
          <br /><br />
          <button style={{ textAlign: 'center', marginLeft: '220px' }} className='intersetbutton' onClick={handleAddSkill}>
            {editIndexSkill !== null ? <><i className="fa fa-save"></i> Save</> : <><i className="fa fa-plus-circle"></i> Add</>}
          </button>
        </div>
        <br />
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
                  <button className='intersetbutton' onClick={() => handleEditSkill(index)}><i className="fa fa-edit"></i> Edit</button><br></br><br></br>
                  <button className='intersetbutton' onClick={() => handleRemoveRow(skill._id, 'skill')}><i className="fa fa-trash"></i> Delete</button>
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
          <br /><br />
          <button style={{ textAlign: 'center', marginLeft: '220px' }} className='intersetbutton' onClick={handleAddAward}>
            {editIndex !== null ? <><i className="fa fa-save"></i> Save</> : <><i className="fa fa-plus-circle"></i> Add</>}
          </button>
        </div>
        <br />
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
                  <button className='intersetbutton' onClick={() => handleEditAward(index)}><i className="fa fa-edit"></i> Edit</button><br></br><br></br>
                  <button className='intersetbutton' onClick={() => handleRemoveRow(award._id, 'award')}><i className="fa fa-trash"></i> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Awards;
