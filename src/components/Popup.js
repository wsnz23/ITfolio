import React from 'react'
import "./popup.css"

import  { useState, useRef } from 'react';




function Popup(props) {
  
  return (props.trigger)?(
    <div className='p'>
      <div className='popup-inner'>
      <div className='thebutttons'>
        <button className='close-btn' style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer', fontSize: '17px' }}>
    <i className="fa fa-window-maximize"></i>
  </button>
  <button className='close-btn' onClick={() => props.setTrigger(false)} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer', fontSize: '18px'}}>
    <i className="fa fa-close"></i>
  </button>
 

</div>
<br/>
{props.children}
      </div>
    </div>
  ):"";
}

export default Popup