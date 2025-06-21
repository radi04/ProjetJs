import React from 'react';
 

const MenuToggle = ({ isOpen, onClick }) => {
  return (
    <button 
      className={`menu-toggle ${isOpen ? 'open' : ''}`} 
      onClick={onClick}
      aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};

export default MenuToggle;