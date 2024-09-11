import './EventInfo.css'

function EventInfoSubtitle(props) {
    return (
        <div className='event-info-subtitle'>
            {props.text}
        </div>
    );
}

export default EventInfoSubtitle;