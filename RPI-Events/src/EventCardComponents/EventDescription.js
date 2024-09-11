import { useState } from "react";
import "./EventDescription.css";
import LikeIconFull from './likeFullIcon.png';

function EventDescription(props) {
    const [liked, setLiked] = useState(false);
    const [icon2Src, setIcon2Src] = useState(props.icon2);

    const manageLocationAndShare = () => {
        if (props.icon1alt === "share") {
            alert("SHARE");
        }
    }
    const manageLike = () => {
        setLiked(!liked);
        if (liked == true)
            setIcon2Src(props.icon2);
        else
            setIcon2Src(LikeIconFull);
    }
    return (
        <div className="event-description-container">
            <div className={props.icon1 === "" ? "hidden" : "event-icon-container"} onClick={manageLocationAndShare}>
                <img src={props.icon1} alt={props.icon1alt} height={20} width={20}></img>
            </div>
            <div className={props.icon2 === "" ? "hidden" : "event-icon-container"} onClick={manageLike}>
                <img className="image-fluid" src={icon2Src} alt={props.icon2alt} height={20} width={20}></img>
            </div>
            <div className={props.tag === true ? "tag-text event-text-container" : "event-text-container"}>
                {props.text}
            </div>
        </div>
    );
}

export default EventDescription;
