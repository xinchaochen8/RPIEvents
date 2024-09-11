import './EventLearnMore.css'
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../App';
import { useContext } from 'react';

function EventLearnMore({event}) {
    let {setSeparateEvent} = useContext(EventContext);
    let navigate = useNavigate();
    const handleClick = () => {
        setSeparateEvent(event);
        navigate('/event-info');
    };
    return (
        <div className="learn-more-container" onClick={handleClick}>
            Learn More
        </div>
    );
}

export default EventLearnMore;