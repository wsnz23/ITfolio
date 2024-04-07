import { useState, useEffect } from 'react';
import './mat.css';
import Popup from '../../components/Popup.js';
import Sidebar from '../global/Sidebar.jsx';
import Topbar from '../global/Topbar.jsx'; // Import Topbar
import cs from './cs.json';
import cis from './cis.json';
import bit from './bit.json';
import { Box } from "@mui/material";

function Mat({ skills, questions }) {
  const [selected, setSelected] = useState(null);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState({});

  const resetState = () => {
    setPopupTrigger(false);
    setSelectedRatings({});
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handleButtonClick = (material) => {
    setSelectedMaterial(material);
    setPopupTrigger(true);
  };

  const handleRatingChange = (questionId, subskill, rating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [`${questionId}_${subskill}`]: rating,
    }));
  };

  useEffect(() => {
    // Reset the state when the component mounts
    resetState();
  }, []);

  return (
    <Box className="view" display="flex">

      <Sidebar />
      { !popupTrigger && <Topbar /> } {/* Render Topbar if popupTrigger is false */}
      <Box flex="1" overflow="auto">
        <div className={`card ${selected === 2 ? 'show' : ''}`}>

          <div className='a'>
            <div className='b'>
              {bit.map((item, i) => (
                <div className='c' key={i}>
                  <div className='d' onClick={() => toggle(i)}>
                    <h2>{item.label}</h2>
                    <span>{selected === i ? '-' : '+'}</span>
                  </div>
                  {selected === i && item.submenu && (
                    <table className='e show'>
                      <thead>
                        <tr>
                          <th>Subject Name</th>
                          <th>Skills</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.submenu.map((submenuItem, j) => (
                          <tr key={j}>
                            <td>{submenuItem.label}</td>
                            <td>
                              <button onClick={() => handleButtonClick(submenuItem)} className='buttonmat'>
                                Action
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          </div>

          {popupTrigger && selectedMaterial && (
            <Popup trigger={popupTrigger} setTrigger={() => { setPopupTrigger(false); resetState(); }}>
              <div>
                <h3 className='poph3'>{selectedMaterial.label} - Skills</h3>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Subskill</th> */}
                      <th>Question</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMaterial.skills && selectedMaterial.question && selectedMaterial.skills.map((subskill, index) => (
                      <tr key={index}>
                        {/* <td>{subskill}</td> */}
                        <td className='tdpop'>{selectedMaterial.question[index]}</td>
                        <td className='tdpop' >
                          <div className="rating-buttons">
                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="poor"
                                checked={selectedRatings[`${index}_${subskill}`] === 'poor'}
                                onChange={() => handleRatingChange(index, subskill, 'poor')}
                              />
                              Poor
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="good"
                                checked={selectedRatings[`${index}_${subskill}`] === 'good'}
                                onChange={() => handleRatingChange(index, subskill, 'good')}
                              />
                              Good
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="very-good"
                                checked={selectedRatings[`${index}_${subskill}`] === 'very-good'}
                                onChange={() => handleRatingChange(index, subskill, 'very-good')}
                              />
                              Very Good
                            </label>

                            <label>
                              <input
                                type="radio"
                                name={`rating_${index}_${subskill}`}
                                value="excellent"
                                checked={selectedRatings[`${index}_${subskill}`] === 'excellent'}
                                onChange={() => handleRatingChange(index, subskill, 'excellent')}
                              />
                              Excellent
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='popupbutton'>
                  <button className='buttonmat'>Submit</button>
                </div>
              </div>
            </Popup>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Mat;
