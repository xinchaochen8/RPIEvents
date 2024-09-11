import { Link } from "react-router-dom";
import "./createEventButton.css";

function CreateEventButton() {
  return <Link to="/create-event" className="btn btn-primary createEventButton">Create Event</Link>;
}

export default CreateEventButton;