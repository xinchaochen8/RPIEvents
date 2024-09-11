import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

// for now this is purely aesthetic, will make this functional when we got actual events to search for
function SearchBar() {
  const search = () => {}; //gotta make it functional

  return (
    <div className="d-flex pe-3 mb-4 search-bar-container">
      <input id="events-search" type="text" />
      <button className="btn btn-primary custom-search-styling" onClick={search}><FontAwesomeIcon icon={faSearch} /></button>
    </div>
  );
}

export default SearchBar;