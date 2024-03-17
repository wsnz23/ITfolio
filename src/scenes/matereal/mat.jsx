import { useState,useEffect  } from 'react';
import './mat.css';
import Popup from '../../components/Popup.js';
import Sidebar from '../global/Sidebar.jsx';

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
   <div className="view"  display="flex" >
    <Sidebar />
    <div className={`card ${selected === 2 ? 'show' : ''}`}>
      
      <div className='a'>
        <div className='b'>
          {data.map((item, i) => (
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
                          <button onClick={() => handleButtonClick(submenuItem)}>
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
            <h3>{selectedMaterial.label} - Skills</h3>
            <table>
              <thead>
                <tr>
                  <th>Subskill</th>
                  <th>Question</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {selectedMaterial.skills && selectedMaterial.question && selectedMaterial.skills.map((subskill, index) => (
                  <tr key={index}>
                    <td>{subskill}</td>
                    <td>{selectedMaterial.question[index]}</td>
                    <td>
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
              <button>Submit</button>
            </div>
          </div>
        </Popup>
      )}
    </div>
    </div>
  );
}

// Example data
const data = [
  {
    label: 'Compulsory specialization subjects',
    submenu: [
      { id:1,
        label: 'Sub Menu 1' ,
        skills: ['aaaa', 'bbbb', 'cccc','aaaa', 'bbbb', 'cccc'],
        question:['q1','q2','q3'],
    },
      { id:2,
        label: 'Sub Menu 2' ,
        skills: ['aaa', 'bbb', 'ccc'], 
        question:['q4','q5','q6'],
    },
    ],
  },
  {
    label: 'Optional specialization subjects',
    submenu: [
      {id:3,
        label: 'Sub Menu 1' ,
        skills: ['aa', 'bb', 'cc'],
        question:['q7','q8','q9'],
     }, 
      { id:4,
        label: 'Sub Menu 2' ,
        skills: ['a', 'b', 'c'], 
        question:['q10','q11','q12'],
     },
    ],
  },
  {
    label: 'Compulsory college subjects',
    submenu: [
      {
        id: 5,
        label: 'Discrete Mathematics',
        skills: ['Mathematical Logic', 'Set Theory', 'Graph Theory'],
        question:['q13','q14','q15'],
      },
      {
        id: 6,
        label: 'Computer Skills for Scientific faculties (c++)',
        skills: ['Programming', 'Data Structures', 'Algorithms'],
        question:['q16','q17','q18'],
      },
      {
        id: 7,
        label: 'Fundamentals of Information Technology',
        skills: ['IT Basics', 'Networking', 'Databases'],
        question:['q12','q20','q21'],
      },
      {
        id: 8,
        label: 'Sub Menu 4',
        skills: ['IT ', 'Net', 'Data'],
        question:['q22','q23','q24'],
      },
      {
        id: 8,
        label: 'Sub Menu 4',
        skills: ['IT ', 'Net', 'Data'],
        question:['q22','q23','q24'],
      },
    ],
  },
];

export default Mat;
