import React, { useState } from "react";
import "./intrest.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Invoices = () => {
  const [interest, setInterest] = useState("");
  const [interestsList, setInterestsList] = useState([]);

  const handleInputChange = (event) => {
    setInterest(event.target.value);
  };

  const handleAddInterest = () => {
    if (interest.trim() !== "") {
      setInterestsList([...interestsList, interest]);
      setInterest(""); // Clear the input box after adding the interest
    }
  };

  const handleDeleteInterest = (index) => {
    const updatedInterests = [...interestsList];
    updatedInterests.splice(index, 1);
    setInterestsList(updatedInterests);
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
        <button className="intersetbutton" onClick={handleAddInterest}>Add Interest</button>
        <br /><br />
        <ul className="interests-list">
          {interestsList.map((item, index) => (
            <li key={index}>
              {item}
              <button className="interestdel" onClick={() => handleDeleteInterest(index)}>Delete</button>
           <br></br> <br></br></li>
            
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Invoices;
