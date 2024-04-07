import React, { useState, useEffect, useRef } from 'react';
import './education.css';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Index = () => {
  const [educationHistory, setEducationHistory] = useState([
    { university: '', major: '', graduationDate: '' },
  ]);

  const majorInputRef = useRef(null);

  const handleAddRow = () => {
    setEducationHistory([
      ...educationHistory,
      { university: '', major: '', graduationDate: '' },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...educationHistory];
    list[index][name] = value;
    setEducationHistory(list);
  };

  const handleRemoveRow = (index) => {
    const list = [...educationHistory];
    list.splice(index, 1);
    setEducationHistory(list);
  };

  useEffect(() => {
    if (majorInputRef.current) {
      const majorInputWidth = majorInputRef.current.offsetWidth;
      const graduationDateInputs = document.querySelectorAll('.graduation-date-input');
      graduationDateInputs.forEach((input) => {
        input.style.width = `${majorInputWidth}px`;
      });
    }
  }, [educationHistory]);

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="work-container">
        <h2>Education</h2>
        <table>
          <thead>
            <tr>
              <th>University</th>
              <th>Major</th>
              <th>Graduation Date (Year)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {educationHistory.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="major"
                    value={item.major}
                    onChange={(e) => handleChange(index, e)}
                    ref={majorInputRef}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="graduationDate"
                    value={item.graduationDate}
                    onChange={(e) => handleChange(index, e)}
                    min="1900"
                    max={(new Date()).getFullYear()}
                    className="graduation-date-input"
                  />
                </td>
                <td >
                  {educationHistory.length - 1 === index && (
                    <button className="workbutton" onClick={handleAddRow }>Add</button>
                  )}
                  {educationHistory.length !== 1 && (
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

export default Index;
