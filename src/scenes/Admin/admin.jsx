import React, { useState, useEffect } from 'react';
import './admin.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import FontAwesome icons for edit and delete
import Topbar from '../global/Topbar.jsx';
import axios from 'axios'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);


  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, []); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getuseradmin');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/contact');
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const handleDeleteUser = (userId) => {
    // Set the selected user before opening the delete confirmation modal
    setSelectedUser(userId);
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };
  

  const handleDeleteContact = (contactId) => {
    setSelectedContact(contactId);
    setIsDeleteModalOpen(true);
  };

  const handleEditUser = (userId) => {
 
   console.log(userId)
      setSelectedUser(userId); // Set the selected user
      setIsModalOpen(true); // Open the modal
   
  };
  
  const handleConfirmDelete = async () => {
    try {
      if (selectedUser) {
        const response = await axios.delete(`http://localhost:3001/deleteuser/${selectedUser}`);
        if (response.status === 200) {
          console.log('User deleted successfully');
          fetchUsers();
        } else {
          console.error('Error deleting user:', response.statusText);
        }
        setIsDeleteModalOpen(false); 
      } else if (selectedContact) {
        const response = await axios.delete(`http://localhost:3001/api/contact/${selectedContact}`);
        fetchContacts();
        if (response.status === 200) {
          console.log('Contact deleted successfully');
          // You can add logic here to remove the contact from the state if needed
        } else {
          console.error('Error deleting contact:', response.statusText);
        }
        setIsDeleteModalOpen(false); 
      }
    } catch (error) {
      console.error('Error deleting:', error.message);
    }
    setIsDeleteModalOpen(false); }
  
  const handleChangeStatus = async () => {
    try {
        console.log(selectedUser);
        console.log(selectedStatus);

        // Extract the user ID from selectedUser
        const userId = selectedUser;
        console.log(selectedUser);

        const response = await axios.put(`http://localhost:3001/updatestatus/${userId}`, {
          status: selectedStatus // Include status in the request body
        });
        
        if (response.status === 200) {
          // Status updated successfully
          // You can add logic here to handle success (e.g., close modal, reload user data)
          setIsModalOpen(false); // Close the modal
          fetchUsers(); 
        } else {
          // Handle error response
          console.error('Error updating status:', response.statusText);
        }
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
    
    setIsModalOpen(false); // Close the modal
};


  return (
    <div>
      <Topbar />
      <div className="admin-dashboard">
        <h2 className="dashboard-heading">Admin Dashboard</h2>
        <div className="table-container">
          <h2>User Table</h2>
          <table className="user-table">
            <thead>
              <tr>
              <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user._id}</td>
                  <td>{user.FullName}</td>
                  <td>{user.Email}</td>
                  <td>{user.status}</td>
                  <td>
                  <button onClick={() => handleEditUser(user._id)}>
    <FaEdit /> {/* Edit icon */}
  </button>
                    <span className="icon-space" />
                    <button onClick={() => handleDeleteUser(user._id)}>
                      <FaTrash /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <h2>Feedback Table</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button onClick={() => handleDeleteContact(contact._id)}>
                      <FaTrash /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
          <h2 style={{ color: 'black' }}>Edit User Status</h2>
    <label htmlFor="status" style={{ color: 'black' }}>Status:</label>
            <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">Choose an option</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button onClick={handleChangeStatus}>Save</button>
            <span className="icon-space" />
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
{isDeleteModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2 style={{ color: 'black' }}>Are you sure you want to delete this?</h2>
      <button onClick={handleConfirmDelete}>Yes</button>
      <span className="icon-space" />
      <button onClick={() => setIsDeleteModalOpen(false)}>No</button>

    </div>
  </div>
)}

    </div>
  );
};

export default AdminDashboard;