import React, { useState } from 'react'
import VideoBackground from './VideoBackground'
import MainContent from './MainContent'
import Header from './Header'
export default function PageLoginPrincipal() {
      const [showAuth, setShowAuth] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

  const toggleAuth = () => {
    setShowAuth(!showAuth);
    if (!showAuth) {
      setShowSignup(true);
    }
  };

  const toggleForms = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div>
     <VideoBackground />
      <div className="content-wrapper">
        <Header 
          showAuth={showAuth} 
          showSignup={showSignup} 
          toggleAuth={toggleAuth} 
        />
        <MainContent 
          showAuth={showAuth} 
          showSignup={showSignup} 
          toggleForms={toggleForms} 
        />
      </div>
    </div>
  )
}
