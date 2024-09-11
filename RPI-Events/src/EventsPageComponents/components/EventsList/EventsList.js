import axios from 'axios';
import EventCard from '../../../EventCardComponents/EventCard';
import "../Pages/events.css";
import './EventsList.css';
import { useAuth } from '../../../FireBase/AuthContext';
import { useEffect, useState } from 'react';

function EventsList({eventsData, selectedTags, openNotification}) {
  let eventList = [];
  let x = false; //if x is false after loop, no tags are selected and so events from all categories should be shown
  for (let tag in selectedTags) {
    if (selectedTags[tag]) x = true;
  }
  for (let tag in selectedTags) {
    if (selectedTags[tag] || !x) { //category was selected or no categories were selected
      for (let i = 0; i < eventsData.events[tag].length; i++) { //add all events from category to list
        eventList.push(eventsData.events[tag][i]);
      }
    }
  }
  const {isAuthenticated} = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get("/users/dash");
        console.log(response.data.registered);
        setRegisteredEvents(response.data.registered);
      } catch (error) {
        openNotification({
          heading: "Error",
          body: "Error occurred while fetching events that user is registered for",
          show: true,
          success: false
        });
      }
    }
    fetchRegisteredEvents();
  }, []);
  
  let events = eventList.map((event) => { //event.title, .time, .location
    let isRegistered = false;
    for (let i = 0; i < registeredEvents.length; i++) {
      if (registeredEvents[i] === event.id) {
        isRegistered = true;
        break;
      }
    }
    const handleRegister = async () => {
      try {
        await axios.post("/user/registerEvent", {
          eventid: event.id
        });
        setRegisteredEvents([
          ...registeredEvents,
          event.id
        ]);
        openNotification({
          heading: "Success",
          body: "Successfully registered for event",
          show: true,
          success: true
        });
      } catch (error) {
        openNotification({
          heading: "Error",
          body: `Error occured while registering for event (${error.message}).\nPlease try again later`,
          show: true,
          success: false
        });
      }
    };

    const handleUnregister = async () => {
      try {
        await axios.post("/user/unregisterEvent", {
          eventid: event.id
        });
        setRegisteredEvents(registeredEvents.filter(id => id !== event.id));
        openNotification({
          heading: "Success",
          body: "Successfully unregistered from event",
          show: true,
          success: true
        });
      } catch (error) {
        openNotification({
          heading: "Error",
          body: `Error occured while unregistering from event (${error.message}).\nPlease try again later`,
          show: true,
          success: false
        });
      }
    };

    return (
      <div key={event.id} className="d-flex flex-column">
        <EventCard
          id={event.id}
          title={event.title}
          description={event.description}
          time={event.time}
          endTime={event.endTime}
          location={event.location}
          tags={event.tags}
          totalSeats={event.totalSeats}
          seatsRemaining={event.remainingSeats}
          // image={event.image}
          handleRegister={handleRegister}
          handleUnregister={handleUnregister}
          isRegistered={isRegistered}
          registerButton={true}
        />
        {/* {isAuthenticated &&
        isRegistered
        ?
        <button onClick={handleUnregister}>Unregister</button>
        :
        <button onClick={handleRegister}>Register</button>
        } */}
      </div>
    );
  });

  return (
    <div className="events-grid-container">
      {events}
    </div>
  );
}

export default EventsList;