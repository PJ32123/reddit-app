import { createSlice } from "@reduxjs/toolkit";

// Creates a slice to store and manage the search term in the Redux state
// Includes an action to set the search term
const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});
// Selector to get the current search term from the state using useSelector that passes the state as an argument
export const selectSearchTerm = (state) => state.search.term;
// Destructures and exports the action creator from the slice to be used in components
export const { setSearchTerm } = searchSlice.actions;
// Exports the reducer to be included in the store
export default searchSlice.reducer;
