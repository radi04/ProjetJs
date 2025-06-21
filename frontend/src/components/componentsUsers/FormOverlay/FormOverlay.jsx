import React from 'react';
 

const formTemplates = {
  join: {
    title: 'Become a Member',
    isForm: true,
    fields: (
      <form id="main-form">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="membership">Membership Tier</label>
        <input type="text" id="membership" name="membership" placeholder="e.g., Gold, Platinum" />
        <button type="submit">Join Now</button>
      </form>
    )
  },
  contact: {
    title: 'Contact Us',
    isForm: true,
    fields: (
      <form id="main-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    )
  },
  about: {
    title: 'About The Club',
    isForm: false,
    fields: (
      <div className="info-content">
        <p>We are an exclusive club dedicated to providing our members with unparalleled experiences and a community of like-minded individuals.</p>
        <p>Founded in 2023, our mission is to create a space for growth, networking, and extraordinary moments. We believe in the power of connection and strive to offer the best for our members.</p>
      </div>
    )
  },
  events: {
    title: 'Upcoming Events',
    isForm: false,
    fields: (
      <div className="info-content">
        <p>There are currently no upcoming events scheduled. Please check back soon!</p>
        <p>Members get exclusive access to all our private events, workshops, and gatherings.</p>
      </div>
    )
  }
};

const FormOverlay = ({ formType, onClose }) => {
  if (!formType) return null;

  const template = formTemplates[formType];
  if (!template) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your submission!');
    onClose();
  };

  return (
    <div className="form-overlay visible" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`form-container ${template.isForm ? '' : 'is-info-panel'}`}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 className="form-title">{template.title}</h2>
        <div className="form-content">
          {template.isForm ? (
            React.cloneElement(template.fields, { onSubmit: handleSubmit })
          ) : (
            template.fields
          )}
        </div>
      </div>
    </div>
  );
};

export default FormOverlay;