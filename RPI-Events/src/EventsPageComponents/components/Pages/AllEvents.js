import TagSelect from "../Tags/TagSelect";
import SearchBar from "../SearchBar/SearchBar";
import EventsList from "../EventsList/EventsList";
// import CreateEventButton from "../CreateEventButton/CreateEventButton";
import TAGS from "../../eventTags";
import "./AllEvents.css";

import { useState } from "react";

// AllEventsPage should sort through eventsData by most popular events whenever we're able to do that
// use setEventsData to update state when some change is made
function AllEvents({eventsData, setEventsData, openNotification}) {
  let initialSelectedTags = {};
  for (let i = 0; i < TAGS.length; i++) {
    initialSelectedTags[TAGS[i]] = false; //initially no tags are selected (show all events of all categories)
  }
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  
  return (
    <>
      <div className="d-flex">
        <div className="sticky-selectors">
          <SearchBar />
          <TagSelect setSelectedTags={setSelectedTags} />
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <EventsList eventsData={eventsData} selectedTags={selectedTags} openNotification={openNotification} />
        </div>
      </div>
    </>
  );
}

export default AllEvents;