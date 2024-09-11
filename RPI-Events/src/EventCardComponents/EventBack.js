import './EventBack.css';

function EventBack(props) {
    return (
        <div className="event-card-back">
            {props.text}
        </div>
    );
}

export default EventBack;
