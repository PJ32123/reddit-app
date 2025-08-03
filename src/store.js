import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import postsReducer from "./features/posts/postsListSlice";

// reducers will be added here as you build them
export const store = configureStore({
  reducer: {
    search: searchReducer,
    posts: postsReducer,
  },
});
