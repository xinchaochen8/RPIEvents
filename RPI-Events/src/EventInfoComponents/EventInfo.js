import EventInfoSubtitle from './EventInfoSubtitle';
import EventInfoTextDescription from './EventInfoTextDescription';
import exampleBanner from "../EventsPageComponents/banner example.png";
import './EventInfo.css'
import { useContext } from 'react';
import {EventContext} from '../App';
import { Link, Navigate } from 'react-router-dom';

function EventInfo() {
    const {separateEvent} = useContext(EventContext);
    console.log(separateEvent);
    // separateEvent = {
    //     id: props.id,
    //     title: props.title,
    //     time: props.time,
    //     endTime: props.endTime,
    //     location: props.location,
    //     tag: props.tags,
    //     totalSeats: props.totalSeats,
    //     seatsRemaining: props.seatsRemaining
    // };

    return (
        <>
            {
            separateEvent && separateEvent.totalSeats != undefined //change to a field taht home page event cards don't have
            ?
            <div className="event-info-container">
                <Link className="event-info-back-button" to="/events-page">Back to All Events</Link>
                <div className='event-info-left'>
                    <div className='event-info-image'>
                        <img className="image-formating" src={separateEvent.image ? separateEvent.image : exampleBanner} alt="event picture" />
                    </div>
                    <div className='event-info-event-data'>
                        <div><b>Location:</b> {separateEvent.location}</div>
                        <div><b>Start Time:</b> {separateEvent.time}</div>
                        <div><b>End Time:</b> {separateEvent.endTime}</div>
                        <div><b>Seats Remaining:</b> {separateEvent.seatsRemaining} / {separateEvent.totalSeats}</div>
                    </div>
                </div>
                <div className='event-info-right'>
                    <div className='event-info-title'>
                        {separateEvent.title}
                    </div>
                    <EventInfoSubtitle text="Event Description"/>
                    <EventInfoTextDescription text={separateEvent.description} />
                    <EventInfoSubtitle text="Affliated Clubs"/>
                    <EventInfoTextDescription text="<clubs>"/>
                </div>
            </div>
            :
            <Navigate to="/events-page" />
            }
        </>
    );
}

export default EventInfo;