import React, { useEffect, useState } from 'react';
import './SavedEvent.css';
import EventCard from '../../EventCardComponents/EventCard';

function SavedEvent({ SavedEvent }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        console.log(SavedEvent);
        if (!SavedEvent || SavedEvent.length === 0) {
            return;
        }
        const fetchPromises = SavedEvent.map(element => {
            const id = element;
            return fetch(`/events/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (!data) return <></>;
                    console.log(data);
                    return (
                        <EventCard
                            key={id}
                            id={id}
                            className={id}
                            title={data.title}
                            time={data.beginDate}
                            location={data.location}
                            description={data.description}
                            beginDate={data.beginDate}
                            completeDate={data.completeDate}
                            registerButton={false}
                        />
                    );
                });
        });
        Promise.all(fetchPromises).then(eventCards => {
            setEvents(eventCards);
            console.log(events);
        });

    }, [SavedEvent]);

    return (
        <div className="events-container">
            {events}
        </div>
    );
}

export default SavedEvent;