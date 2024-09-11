import './EventTitle.css';

function EventTitle(props) {
    return (
        <div className="event-title-container">
            {props.text}
        </div>
    );
}

export default EventTitle;
