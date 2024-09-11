import EventTabs from "./components/Pages/EventsTabs";
import AllEvents from "./components/Pages/AllEvents";
import UserFeed from "./components/Pages/UserFeed";
import Notification from "../components/Notification/Notification";
import TAGS from "./eventTags";
import exampleBanner from "./banner example.png";
import BannerCarousel from "./components/Banner/BannerCarousel";
import '../HomeComponents/HomeContainer';
import './EventsPage.css'

import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const imageDataToUrl = (imageData) => {
  if (!imageData) return null;
  const base64String = btoa(
    new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return `data:image/jpeg;base64,${base64String}`;
};

function initializeEventsData() { //this is just giving events data a basic structure, this will likely change
  let events = {events: {}, banners: []};
  for (let i = 0; i < TAGS.length; i++) {
    events.events[TAGS[i]] = []; 
  }
  return events;
}

function EventsPage() {
  useEffect(() => {
    if (document.getElementById("dashboard-label"))
      document.getElementById("dashboard-label").classList.remove("highlighted-page");
    if (document.getElementById("register-organizer-label"))
      document.getElementById("register-organizer-label").classList.remove("highlighted-page");
    document.getElementById("events-label").classList.add("highlighted-page");
  }, []);

  const [notification, updateNotification] = useState(<></>);
  const openNotification = ({heading, body, show, success}) => {
    if (document.getElementById("noti")) updateNotification(<></>);
    let noti = (
      <Notification 
        heading={heading} 
        body={body} 
        show={show} 
        success={success}
        updateNotification={updateNotification}
        />
      );
    updateNotification(noti);
  };

  let initialEvents = initializeEventsData();
  // for (let i = 0; i < 12; i++) {
  //   initialEvents.events[TAGS[i % TAGS.length]].push({
  //     title: "A REALLY LONG TITLE (title)",
  //     description: "A description",
  //     time: "2 pm",
  //     endTime: "3 pm",
  //     location: "Union",
  //     totalSeats: 10,
  //     remainingSeats: 5,
  //     tags: TAGS[i % TAGS.length],
  //     image: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/21-477776_Parakeet_WhiteBG_1080x720",
  //     id: "event-" + i
  //   });
  // }
  for (let i = 0; i < 3; i++) {
    initialEvents.banners.push({
      img: exampleBanner,
      alt: "Therapy dogs",
      key: "banner-" + i
    });
  }
  
  const [eventsData, setEventsData] = useState(initialEvents); //for now, we use static data generated here. when we have a backend, we will fetch data from there to display
  useEffect(() => {
    const fetchEvents = async () => {
      console.log("entered fetchEvent");
      //fetch events from GET /events and load into eventsData. then make a pr. then figure out how to get token
      //and make a request to register (for now do PUT /events/:id but see if xin chao makes a separate endpoint when meeting)
      try {
        const response = await axios.get("/events");
        const events = response.data;
        console.log(events);
        let newEventsData = initializeEventsData();
        for (let i = 0; i < 3; i++) {
          newEventsData.banners.push({
            img: exampleBanner,
            alt: "Therapy dogs",
            key: "banner-" + i
          });
        }
        for (let i = 0; i < events.length; i++) {
          let date = events[i].beginDate;
          date = date.split("T")[0];
          let endDate = events[i].completeDate;
          endDate = endDate.split("T")[0];
          newEventsData.events[events[i].tags[0]].push({
            title: events[i].title,
            description: events[i].description,
            time: date,
            endTime: endDate,
            location: events[i].location,
            totalSeats: events[i].seats.totalSeats,
            remainingSeats: events[i].seats.seatsRemaining,
            tags: events[i].tags[0],
            image: imageDataToUrl(events[i].images),
            id: events[i]._id,
            registered: false //check if user is registered for event
          });
        }
        console.log(newEventsData);
        setEventsData(newEventsData);
      } catch (error) {
        openNotification({
          heading: "Error",
          body: `Error occurred while fetching events (${error.message}).\nPlease try again later.`,
          show: true,
          success: false
        });
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div id="hide-banner-carousel">
        <BannerCarousel banners={eventsData.banners} />
      </div>
      <div id="tab-title" className="text-center tab-title">
        All Events
      </div>
      <EventTabs 
        allEventsPage={<AllEvents eventsData={eventsData} setEventsData={setEventsData} openNotification={openNotification} />} 
        userFeedPage={<UserFeed eventsData={eventsData} setEventsData={setEventsData} openNotification={openNotification} />}
      />
      {notification}
    </>
  );
}

export default EventsPage;