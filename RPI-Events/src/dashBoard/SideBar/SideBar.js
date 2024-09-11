import React from 'react';
import { Nav } from 'react-bootstrap';
import './SideBar.css';

const SideBar = ({ onItemSelect }) => {
  // Function to handle click events on Nav.Link
  const handleClick = (eventKey) => {
    onItemSelect(eventKey);
  };

  return (
    <Nav defaultActiveKey="Profile" className="flex-column bg-light" style={{ height: "100vh", width: "200px", flexShrink: 0 }} onSelect={handleClick}>
      <Nav.Link eventKey="Profile" className="text-dark">Profile</Nav.Link>
      <Nav.Link eventKey="RegisteredEvents" className="text-dark">Registered Events</Nav.Link>
      <Nav.Link eventKey="SavedEvents" className="text-dark">Saved Events</Nav.Link>
      <Nav.Link eventKey="NewEvent" className="text-dark">New Event</Nav.Link>
    </Nav>
  );
};

export default SideBar;
