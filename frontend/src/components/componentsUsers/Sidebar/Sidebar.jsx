import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onLinkClick }) => {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
 
  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sidebar-header">
        {/* Logo is now outside */}
      </div>
     {user.role=="admin"&&<Link to="/add-event">Ajouter evenements</Link>}
           {user.role=="admin"&&<Link to="/view-events">Afficher evenements</Link>}
    
    </nav>
  );
};

export default Sidebar;