import React, { useState } from "react";
import "./awards.css";
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx';

const Awards = () => {
  const [skills, setSkills] = useState([{ name: "", source: "" }]);
  const [awards, setAwards] = useState([{ name: "", source: "" }]);

  const handleAddSkillRow = () => {
    setSkills([...skills, { name: "", source: "" }]);
  };

  const handleAddAwardRow = () => {
    setAwards([...awards, { name: "", source: "" }]);
  };

  const handleSkillChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...skills];
    list[index][name] = value;
    setSkills(list);
  };

  const handleAwardChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...awards];
    list[index][name] = value;
    setAwards(list);
  };

  const handleDeleteSkillRow = (index) => {
    if (skills[index].name || skills[index].source) {
      const list = [...skills];
      list.splice(index, 1);
      setSkills(list);
    }
  };

  const handleDeleteAwardRow = (index) => {
    if (awards[index].name || awards[index].source) {
      const list = [...awards];
      list.splice(index, 1);
      setAwards(list);
    }
  };

  return (
    <div className="view" display="flex">
      <Sidebar />
      <Topbar />
      <div className="skill-container">
        <h2 className="settings-title">Skills acquired from outside university subjects</h2>
        <table>
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={index}>
                <td>
                  <input
                  className="award-input" 
                    type="text"
                    name="name"
                    placeholder="  Enter skill name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </td>
                <td>
                  <input
                  className="award-input" 
                    type="text"
                    name="source"
                    placeholder="  Enter source"
                    value={skill.source}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </td>
                <td>
                  <button className="delaward" onClick={() => handleDeleteSkillRow(index)} disabled={!skill.name && !skill.source}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="awardbutton" onClick={handleAddSkillRow}>Add Skill</button>
      </div>
      <div className="skill-container">
        <h2 className="settings-title">Awards</h2>
        <table>
          <thead>
            <tr>
              <th>Award Name</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award, index) => (
              <tr key={index}>
                <td>
                  <input
                 className="award-input" 
                    type="text"
                    name="name"
                    placeholder="  Enter award name"
                    value={award.name}
                    onChange={(e) => handleAwardChange(index, e)}
                  />
                </td>
                <td>
                  <input
                  className="award-input" 
                    type="text"
                    name="source"
                    placeholder="  Enter source"
                    value={award.source}
                    onChange={(e) => handleAwardChange(index, e)}
                  />
                </td>
                <td>
                  <button className="delaward" onClick={() => handleDeleteAwardRow(index)} disabled={!award.name && !award.source}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="awardbutt" onClick={handleAddAwardRow}>Add Award</button>
      </div>
    </div>
  );
};

export default Awards;
