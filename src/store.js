import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import postsReducer from "./features/posts/postsListSlice";
import clickedPostReducer from "./features/clickedPost/clickedPostSlice";

// Creates a Redux store with the search, posts, and clickedPost slices
export const store = configureStore({
  reducer: {
    search: searchReducer,
    posts: postsReducer,
    clickedPost: clickedPostReducer,
  },
});
