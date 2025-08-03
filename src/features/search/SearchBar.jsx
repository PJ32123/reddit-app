import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "./searchSlice";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // optional: could trigger search, filter, or navigate here
    console.log("Submitted search:", searchTerm);
    dispatch(setSearchTerm("")); // Clear search term after submit if desired
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
