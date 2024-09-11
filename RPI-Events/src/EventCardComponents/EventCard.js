import { useState } from 'react';
import './EventCard.css';
import EventImage from './EventImage.js';
import EventTitle from './EventTitle.js';
import EventDescription from './EventDescription.js';
import EventRegisterButton from './EventRegisterButton.js';
import EventLearnMore from './EventLearnMore.js';
// import EventBack from './EventBack.js';

import ShareIcon from './shareIcon.png';
import LocationIcon from './locationIcon.png';
import LikeIconEmpty from './likeEmptyIcon.png';

//there are two aspects of props the title, text, and time (all are type string)
//Title: title of the event
//Time: date of event
//Text: text on the back
function EventCard(props) {
    const [moveDiv, setMoveDiv] = useState(false);
    const handleClick = () => {
        alert(1)
    }

    let event = {
        id: props.id,
        title: props.title,
        description: props.description,
        time: props.time,
        endTime: props.endTime,
        location: props.location,
        tag: props.tags,
        totalSeats: props.totalSeats,
        seatsRemaining: props.seatsRemaining,
        image: props.image
    };

    return (
        <div className={"event-card " + props.className}
            onMouseEnter={() => { setMoveDiv(true) }}
            onMouseLeave={() => setMoveDiv(false)}
        >
            <div className={moveDiv ? "shift-image" : "shift-back-image"} onClick={handleClick}>
                <EventImage url={props.image} />
            </div>
            <div className={moveDiv ? "shift-div" : "shift-back-div"}>
                <EventLearnMore event={event} />
                <div className="removeMarginBottom" onClick={handleClick}>
                    <EventTitle text={props.title} />
                </div>
                <EventDescription icon1="" icon2=""  icon1alt="test" icon2alt="" text={props.time} tag={false}/>
                <EventDescription icon1={LocationIcon} icon2=""  icon1alt="location" icon2alt="" text={props.location} tag={false}/>
                <EventDescription icon1={ShareIcon} icon2={LikeIconEmpty} icon1alt="share" icon2alt="like" tag={false}/>
                <EventDescription icon1="" icon2="" icon1alt="" icon2alt="" text={props.tags} tag={true}/>
                {props.registerButton !== false && <EventRegisterButton handleRegister={props.handleRegister} handleUnregister={props.handleUnregister} isRegistered={props.isRegistered} />}
            </div>
            {/* <EventBack text="hello"/> */}
        </div>
    );
}

export default EventCard;
