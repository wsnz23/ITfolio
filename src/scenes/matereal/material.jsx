import React, { useState } from 'react';
import Topbar from "../global/Topbar";
import menuData from './menuData';  // Adjust the import path based on your project structure
import './mm.css';
import Popup from '../../components/Popup.js';


// function Material() {
//   const [openSubMenu, setOpenSubMenu] = useState([]);
//   const [selectedSubMenu, setSelectedSubMenu] = useState(null);

//   const toggleSubMenu = (index) => {
//     setOpenSubMenu((prevOpenSubMenu) => {
//       const updatedSubMenu = [...prevOpenSubMenu];
//       updatedSubMenu[index] = !updatedSubMenu[index];
//       setSelectedSubMenu(updatedSubMenu[index] ? index : null);
//       return updatedSubMenu;
//     });
//   };

//   const renderSubMenu = (subMenu, parentIndex) => {
//     return (
//       <ul className={`submenu ${openSubMenu[parentIndex] ? 'open' : ''}`}>
//         {subMenu.map((subItem, index) => (
//           <li key={index} className={openSubMenu[parentIndex] ? 'open' : ''} 
//               onClick={() => toggleSubMenu(parentIndex)}>
//             {subItem.label}
//             <button onClick={riat()} >hi</button>
//             {subItem.submenu && renderSubMenu(subItem.submenu, index)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const riat = () => {
    
//   }

//   const renderPopup = () => {
//     if (selectedSubMenu !== null) {
//       // You can customize the popup content here
//       return (
//         <div className="popup">
//           <h2>{menuData[selectedSubMenu].label} Details</h2>
//           {/* Add more details or components as needed */}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="Card">
//       <Topbar />
//       <h1>Materials</h1>
//       <ul className="firstul">
//         {menuData.map((item, index) => (
//           <li key={index} className={openSubMenu[index] ? 'open' : ''} 
//               onClick={() => toggleSubMenu(index)}>
//             {item.label}
          
//             {item.submenu && renderSubMenu(item.submenu, index)}
            
//           </li>
//         ))}
//          {renderPopup()}
//       </ul>
     
//     </div>
//   );
// }

// export default Material;



function Material() {
  const [openSubMenu, setOpenSubMenu] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);

  const toggleSubMenu = (index) => {
    setOpenSubMenu((prevOpenSubMenu) => {
      const updatedSubMenu = [...prevOpenSubMenu];
      updatedSubMenu[index] = !updatedSubMenu[index];
      setSelectedSubMenu(updatedSubMenu[index] ? index : null);
      setShowQuestions(false); // إخفاء صفحة الأسئلة عند تبديل القائمة
      return updatedSubMenu;
    });
  };

  const [openPopups, setOpenPopups] = useState([]);

  const renderSubMenu = (subMenu, parentIndex) => {
    return (
      <ul className={`submenu ${openSubMenu[parentIndex] ? 'open' : ''}`}>
        {subMenu.map((subItem, index) => (
          <li key={index} className={openSubMenu[parentIndex] ? 'open' : ''} onClick={() => toggleSubMenu(parentIndex)}>
            {subItem.label}
            <button onClick={() => handleButtonPopup(index)}>renderQuestions</button>
            <Popup trigger={openPopups[index]} setTrigger={(value) => handlePopupChange(index, value)}>
           <table> <thead>
      <tr>
        <th>Skill</th>
        <th>Question</th>
        <th>Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Skill 1</td>
        <td>Question 1</td>
        <td> 
          <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div>
</td>
      </tr>
      <tr>
        <td>Skill 2</td>
        <td>Question 2</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
      <tr>
        <td>Skill 3</td>
        <td>Question 3</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
      <tr>
        <td>Skill 4</td>
        <td>Question 4</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
      <tr>
        <td>Skill 5</td>
        <td>Question 5</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
      <tr>
        <td>Skill 6</td>
        <td>Question 6</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
      <tr>
        <td>Skill 7</td>
        <td>Question 7</td>
        <td> <div class="rating-buttons">
    <label>
      <input type="radio" name="rating" value="poor"/>
      Poor
    </label>

    <label>
      <input type="radio" name="rating" value="good"/>
      Good
    </label>

    <label>
      <input type="radio" name="rating" value="very-good"/>
      Very Good
    </label>

    <label>
      <input type="radio" name="rating" value="excellent"/>
      Excellent
    </label>
  </div></td>
      </tr>
    </tbody>
  </table>
            </Popup>
            {subItem.submenu && renderSubMenu(subItem.submenu, index)}
          </li>
        ))}
      </ul>
    );
  };
  
  const handleButtonPopup = (index) => {
    // Set the corresponding item's popup state to true
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = true;
      return newOpenPopups;
    });
  };
  
  const handlePopupChange = (index, value) => {
    // Set the corresponding item's popup state to the provided value
    setOpenPopups((prevOpenPopups) => {
      const newOpenPopups = [...prevOpenPopups];
      newOpenPopups[index] = value;
      return newOpenPopups;
    });
  };
  
  const renderPopup = () => {
    if (selectedSubMenu !== null) {
      return (
        <div className="pp">
          <h2>{menuData[selectedSubMenu].label} Details</h2>
        </div>
      );
    }
    return null;
  };

  const renderQuestions = () => {
    if (showQuestions) {
      // قم بعرض صفحة الأسئلة هنا
      return (
        <div className="questions">
          <h2>أسئلة</h2>
          {/* يمكنك إضافة مكونات أخرى لصفحة الأسئلة */}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="Card">
      <Topbar />
      <h1>Materials</h1>
      <ul className="firstul">
        {menuData.map((item, index) => (
          <li key={index} className={openSubMenu[index] ? 'open' : ''} onClick={() => toggleSubMenu(index)}>
            {item.label}
            {item.submenu && renderSubMenu(item.submenu, index)}
          </li>
        ))}
      </ul>
      {renderPopup()}
      {renderQuestions()}
      
    </div>
  );
}

export default Material;