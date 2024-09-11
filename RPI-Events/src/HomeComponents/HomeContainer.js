import React, { useEffect } from 'react';
import './HomeContainer.css';
import EventCardContainer from './EventCardContainer.js';
import InformationContainer from './InformationContainer.js';

function HomeContainer() {

    useEffect(() => {
        if (document.getElementById("dashboard-label"))
            document.getElementById("dashboard-label").classList.remove("highlighted-page");
        if (document.getElementById("register-organizer-label"))    
            document.getElementById("register-organizer-label").classList.remove("highlighted-page");
        if (document.getElementById("events-label"))
            document.getElementById("events-label").classList.remove("highlighted-page");
    }, []);


    return (
        <div className="home-page-container">
            <InformationContainer />
            <EventCardContainer />
        </div>
    );
}

export default HomeContainer;
