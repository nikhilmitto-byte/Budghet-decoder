import React, { useState, useEffect } from 'react';
import './Keyboard3D.css';

const Keyboard3D = () => {
  const [pressedKeys, setPressedKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedKeys(prev => ({ ...prev, [e.key.toUpperCase()]: true }));
    };
    const handleKeyUp = (e) => {
      setPressedKeys(prev => ({ ...prev, [e.key.toUpperCase()]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const keysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keysRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const Key = ({ label, className = '' }) => {
    const isPressed = pressedKeys[label] || pressedKeys[label.toLowerCase()];
    return (
      <div 
        className={`key-3d ${className} ${isPressed ? 'pressed' : ''}`}
        onMouseDown={() => setPressedKeys(prev => ({ ...prev, [label]: true }))}
        onMouseUp={() => setPressedKeys(prev => ({ ...prev, [label]: false }))}
        onMouseLeave={() => setPressedKeys(prev => ({ ...prev, [label]: false }))}
      >
        {label}
        <div className="key-light"></div>
      </div>
    );
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-3d">
        <div className="key-row">
          {keysRow1.map(key => <Key key={key} label={key} />)}
        </div>
        <div className="key-row" style={{ marginLeft: '25px' }}>
          {keysRow2.map(key => <Key key={key} label={key} />)}
        </div>
        <div className="key-row" style={{ marginLeft: '50px' }}>
          {keysRow3.map(key => <Key key={key} label={key} />)}
          <Key label="ENTER" className="enter" />
        </div>
        <div className="key-row" style={{ marginLeft: '120px' }}>
          <Key label="BUDGET" className="space" />
        </div>
      </div>
    </div>
  );
};

export default Keyboard3D;
