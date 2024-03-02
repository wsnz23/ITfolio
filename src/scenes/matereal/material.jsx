import React, { useState } from 'react';
import Topbar from "../global/Topbar";
import menuData from './menuData';  // Adjust the import path based on your project structure
import './mm.css';

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

  const riat = () => {
    alert('You clicked the "hi" button!');
    setShowQuestions(true); // إظهار صفحة الأسئلة عند النقر على الزر "hi"
  };

  const renderSubMenu = (subMenu, parentIndex) => {
    return (
      <ul className={`submenu ${openSubMenu[parentIndex] ? 'open' : ''}`}>
        {subMenu.map((subItem, index) => (
          <li key={index} className={openSubMenu[parentIndex] ? 'open' : ''} onClick={() => toggleSubMenu(parentIndex)}>
            {subItem.label}
            <button onClick={riat}>renderQuestions</button>
            {}
            {subItem.submenu && renderSubMenu(subItem.submenu, index)}
          </li>
        ))}
      </ul>
    );
  };

  const renderPopup = () => {
    if (selectedSubMenu !== null) {
      return (
        <div className="popup">
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
