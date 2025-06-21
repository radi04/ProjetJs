import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
 import "./style.css"
import MenuToggle from './MenuToggle/MenuToggle';
import MainContent from './MainContent/MainContent';
import FormOverlay from './FormOverlay/FormOverlay';
import logo from '../../images/logo.png';

function PagePrincpale() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formType, setFormType] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = (type) => {
    setFormType(type);
    setSidebarOpen(false);
  };

  const closeForm = () => {
    setFormType(null);
  };

  return (
    <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="video-background">
        <video autoPlay muted loop id="bg-video">
          <source src="C:\Users\dell\Desktop\login\We Are Sales Conference 2022 _ The official aftermovie.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <img src={logo} alt="Club Logo" className="main-logo" id="main-logo" />

      <MenuToggle isOpen={sidebarOpen} onClick={toggleSidebar} />

      <Sidebar isOpen={sidebarOpen} onLinkClick={handleLinkClick} />

      <MainContent />

      {formType && <FormOverlay formType={formType} onClose={closeForm} />}
    </div>
  );
}

export default PagePrincpale;