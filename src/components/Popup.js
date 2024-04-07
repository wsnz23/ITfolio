import React, { useState, useRef } from 'react';
import "./popup.css";

function Popup(props) {
  const [position, setPosition] = useState({ x: (window.innerWidth - 600) / 2, y: (window.innerHeight - 400) / 2 });
  const [originalSize, setOriginalSize] = useState({ width: 600, height: 400 });
  const innerContentRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setOriginalSize({ width: innerContentRef.current.offsetWidth, height: innerContentRef.current.offsetHeight });
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition({ x: (window.innerWidth - originalSize.width) / 2, y: (window.innerHeight - originalSize.height) / 2 });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setMousePosition({ offsetX, offsetY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - mousePosition.offsetX;
      const newY = e.clientY - mousePosition.offsetY;
      setPosition({ x: newX, y: newY });
    }
  };

  return props.trigger ? (
    <div className={`p ${isMaximized ? 'maximized' : ''}`}>
      <div
        className='popup-inner'
        style={{ 
          position: 'absolute', 
          top: position.y, 
          left: position.x, 
          width: isMaximized ? '100vw' : originalSize.width + 300, 
          height: isMaximized ? '100vh' : originalSize.height + 300,
          cursor: isMaximized ? 'auto' : 'move'  // Change cursor to "move" if not maximized
        }}
        ref={innerContentRef}
        onMouseDown={!isMaximized ? handleMouseDown : undefined} // Allow dragging only when not maximized
        onMouseUp={!isMaximized ? handleMouseUp : undefined}
        onMouseMove={!isMaximized ? handleMouseMove : undefined}
      >
        <div className='thebutttons'>
          <button
            className='close-btn'
            style={{
              border: 'none',
              background: 'none',
              padding: '0',
              cursor: 'pointer',
              fontSize: '17px'
            }}
            onClick={handleMaximize}
          >
            <i className={isMaximized ? 'fa fa-window-restore' : 'fa fa-window-maximize'}></i>
          </button>
          <button
            className='max-btn'
            onClick={() => props.setTrigger(false)}
            style={{
              border: 'none',
              background: 'none',
              padding: '0',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            <i className="fa fa-close"></i>
          </button>
        </div>
        <br />
        {props.children}
      </div>
    </div>
  ) : null;
}

export default Popup;
