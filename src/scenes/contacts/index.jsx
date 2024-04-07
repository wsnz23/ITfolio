import React, { useState } from "react";
import Header from "../../components/Header";
import "./workexperince.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Contacts = () => {
  const [workHistory, setWorkHistory] = useState([
    { company: "", position: "", startDate: "", endDate: "" },
  ]);

  const handleAddRow = () => {
    setWorkHistory([...workHistory, { company: "", position: "", startDate: "", endDate: "" }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...workHistory];
    list[index][name] = value;
    setWorkHistory(list);
  };

  const handleRemoveRow = (index) => {
    const list = [...workHistory];
    list.splice(index, 1);
    setWorkHistory(list);
  };

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="work-container">
        <h2>Work History</h2>
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
            {workHistory.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="company"
                    value={item.company}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td >
                  {workHistory.length - 1 === index && (
                    <button className="workbutton" onClick={handleAddRow }>Add</button>
                  )}
                  {workHistory.length !== 1 && (
                    <button  className="workbutton" onClick={() => handleRemoveRow(index)}>Remove</button>
                  )}
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
