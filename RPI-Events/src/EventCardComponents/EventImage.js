import './EventImage.css';
import Image from "./widePicture.jpg";

function EventImage({url}) {
    return (
        <div className="event-image-container">
            <img className="event-image" src={url ? url : Image} alt={"Event"}></img>
        </div>
    );
}

export default EventImage;
