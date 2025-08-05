import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "./searchSlice";
import "./SearchBar.css";
// SearchBar component for managing the search input and dispatching actions to update the Redux state
function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  // Handles input changes and dispatches the setSearchTerm action with the new value
  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  // Clears the search term by dispatching setSearchTerm with an empty string
  const clearSearch = () => {
    dispatch(setSearchTerm(""));
  };
  // Renders the search input field and a button to clear the search term
  // The button is disabled when the search term is empty
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Reddit"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="clear-btn"
        onClick={clearSearch}
        aria-label="Clear search"
        disabled={!searchTerm}
      >
        ×
      </button>
    </div>
  );
}

export default SearchBar;
