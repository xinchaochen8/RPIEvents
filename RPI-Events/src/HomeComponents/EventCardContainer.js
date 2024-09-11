import './EventCardContainer.css';
import EventCard from '../EventCardComponents/EventCard.js';

function EventCardContainer() {
    let titles = ["1. Some Very Long ", "2. Some Very Long Title Title", "3. Some Very Long Title Title Title",
                  "4. Some Very Long Title Title Title", "5. Some Very Long Title Title Title", "6. Some Very Long Title Title Title",
                  "7. Some Very Long Title Title Title", "8. Some Very Long Title Title Title", "9. Some Very Long Title Title Title"]
    let times = ["Mon, January 30, 12 pm", "Tue, Febuary 30, 12 pm", "Wed, March 30, 12 pm",
                 "Thu, June 30, 12 pm", "Fri, July 30, 12 pm", "Sat, August 30, 12 pm",
                 "Sun, October 30, 12 pm", "Mon, November 30, 12 pm", "Mon, December 30, 12 pm"]
    let location = ["Union", "Folsom Library", "BarH", "Hall Hall", "Commons", "Pitsburg building", "West Hall Auditorium", "EMPAC", "EMPAC"]
    let tags = ["food", "study", "sports"]
    let events = [];
    for (let row = 0; row < 3; row++) 
        for (let col = 0; col < 2; col++)
            events.push(<EventCard key={2*row+col} id={"EventCard" + row + col} className={"EventCard" + row + col}
            title={titles[2*row + col]} time={times[3*row + col]} location={location[3*row + col]} tags={"Tags: " + tags.join(", ")}/>);
    return (
        <div className="event-card-container">
            {events}
        </div>
    );
}

export default EventCardContainer;
