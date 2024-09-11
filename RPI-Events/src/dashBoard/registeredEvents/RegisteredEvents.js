import React, { useEffect, useState } from 'react';
import './RegisteredEvents.css';
import EventCard from '../../EventCardComponents/EventCard';
import axios from 'axios';

function RegisteredEvents({ RegisteredEvent }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log(RegisteredEvent);
        if (!RegisteredEvent || RegisteredEvent.length === 0) {
            return;
        }
        const fetch = async () => {
            let eventCards = [];
            for (let i = 0; i < RegisteredEvent.length; i++) {
                const id = RegisteredEvent[i];
                console.log(`/events/${id}`);
                const response = await axios.get(`/events/${id}`);
                if (!response.data) continue;
                console.log(response);
                console.log(response.data);
                eventCards.push(
                    <EventCard
                        key={id}
                        id={id}
                        className={id}
                        title={response.data.title}
                        time={response.data.beginDate.split("T")[0]}
                        endTime={response.data.completeDate.split("T")[0]}
                        location={response.data.location}
                        tags={response.data.tags[0]}
                        totalSeats={response.data.seats.totalSeats}
                        seatsRemaining={response.data.seats.seatsRemaining}
                        description={response.data.description}
                        beginDate={response.data.beginDate}
                        completeDate={response.data.completeDate}
                        registerButton={false}
                    />
                );
            }
            setEvents(eventCards);
        };
        // const fetchPromises = RegisteredEvent.map(async element => {
        //     const id = element;
        //     const response = await axios.get(`/events/${id}`);
        //     console.log(response.data);
        //     return (
        //         <EventCard
        //             key={id}
        //             id={id}
        //             className={id}
        //             title={response.data.title}
        //             time={response.data.beginDate}
        //             endTime={response.data.completeDate}
        //             location={response.data.location}
        //             tags={response.data.tags[0]}
        //             totalSeats={response.data.seats.totalSeats}
        //             seatsRemaining={response.data.seats.seatsRemaining}
        //             description={response.data.description}
        //             beginDate={response.data.beginDate}
        //             completeDate={response.data.completeDate}
        //             registerButton={false}
        //         />
        //     );

            // return fetch(`/events/${id}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data.title);
            //         return (
            //             <EventCard
            //                 key={id}
            //                 id={id}
            //                 className={id}
            //                 title={data.title}
            //                 time={data.beginDate}
            //                 location={data.location}
            //                 description={data.description}
            //                 beginDate={data.beginDate}
            //                 completeDate={data.completeDate}
            //                 registerButton={false}
            //             />
            //         );
            //     });
        // });
        // Promise.all(fetchPromises).then(eventCards => {
        //     setEvents(eventCards);
        //     console.log(events);
        // });
        fetch();
    }, [RegisteredEvent]);

    return (
        <div className="events-container">
            {events}
        </div>
    );
}

export default RegisteredEvents;