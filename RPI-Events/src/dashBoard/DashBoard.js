import React, { useState, useEffect } from 'react';
import SideBar from './SideBar/SideBar';
import Profile from './Profile/profile';
import EventCreationForm from '../components/Forms/EventCreationForm';
import SavedEvent from './savedEvents/SavedEvents';
import RegisteredEvents from './registeredEvents/RegisteredEvents';
import '../HomeComponents/HomeContainer';

const DashBoard = () => {
  useEffect(() => {
    if (document.getElementById("dashboard-label"))
      document.getElementById("dashboard-label").classList.add("highlighted-page");
    if (document.getElementById("register-organizer-label"))
      document.getElementById("register-organizer-label").classList.remove("highlighted-page");
    document.getElementById("events-label").classList.remove("highlighted-page");
  }, []);

  const [activeComponent, setActiveComponent] = useState('Profile');
  const [userData, setUserData] = useState(null);

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);
  /*
    userdata for refernece
    {
      "username": "空白",
      "email": "doraemonxdyaa@gmail.com",
      "photo": "Binary.createFromBase64('iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAAA3NCSVQICAjb4U/gAAAAX3pUWHRSYXcgcHJvZmlsZSB0eXBlIEFQ…', 0)",
      "uid": "QMXilq0RdddylHEZz5tVPQcBjgd2",
      "role": {
          "Organizer": {
              "Organizations": []
          },
          "Student": {
              "Organizations": []
          },
          "Moderator": {
              "AllOrganizationsAccess": false
          },
          "_id": "66199a7583c07aa5cc0ebcce"
      },
      "saved": [],
      "registered": []
    }
  */
  const fetchUserData = async () => {

    try {
      const response = await fetch('/users/dash', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log('User data:', data);
        if (data.saved) {
          setSavedEvents(data.saved);
        }
        if (data.registered) {
          setRegisteredEvents(data.registered);
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const components = {
    Profile: <Profile profileData={userData} />,
    RegisteredEvents: <RegisteredEvents RegisteredEvent={registeredEvents} />,
    SavedEvents: <SavedEvent SavedEvent={savedEvents} />,
    NewEvent: <EventCreationForm onSubmit={() => { }} />,
  };

  const handleItemSelect = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      {/* <NavBarContainer /> */}
      <div style={{ display: 'flex' }}>
        <SideBar onItemSelect={handleItemSelect} />
        <div className='flex-grow-1 d-flex justify-content-center' style={{ minHeight: '100vh' }}>
          {userData && components[activeComponent]}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
