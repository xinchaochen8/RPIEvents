import './EventInfo.css'

function EventInfoTextDescription(props) {
    return (
        <div className='event-info-text'>
            {props.text}
        </div>
    );
}

export default EventInfoTextDescription;