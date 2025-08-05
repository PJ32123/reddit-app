import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subreddits } from "../../components/SubredditList";
import { fetchFromReddit } from "../../utils/fetchFromReddit";

// A thunk to fetch home posts from a predifined list of subreddits
// Creates an action with type "posts/fetchHomePosts" and payload of posts
// This is used when Reddit logo or Home button is clicked
// Images are normalized using fetchFromReddit
export const fetchHomePosts = createAsyncThunk(
  "posts/fetchHomePosts",
  async () => {
    const subredditString = subreddits.join("+"); // combine with +
    const json = await fetchFromReddit(`/r/${subredditString}`, true);
    return json.data.children.map((child) => child.data);
  }
);

// A thunk to fetch posts from a specific subreddit
// Creates an action with type "posts/fetchSubredditPosts" and payload of posts
// This is used when a user selects a subreddit from the list
// Images are normalized using fetchFromReddit
export const fetchSubredditPosts = createAsyncThunk(
  "posts/fetchSubredditPosts",
  async (subreddit) => {
    const json = await fetchFromReddit(`/r/${subreddit}`, true);
    return json.data.children.map((child) => child.data);
  }
);
// Creates a slice that stores posts returned by the thunks above
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    lastFetchType: null,
    error: null,
  },
  // No reducers are defined here as we are using thunks to handle state changes so no actions are created
  // with this slice
  reducers: {},
  // Handles the actions created by the thunks above
  // Uses the builder pattern to handle different states of the thunks
  extraReducers: (builder) => {
    builder
      // Home posts
      .addCase(fetchHomePosts.pending, (state) => {
        state.status = "loading";
        state.lastFetchType = "home";
      })
      .addCase(fetchHomePosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchHomePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Subreddit posts
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.status = "loading";
        state.lastFetchType = "subreddit";
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors used with useSelector that has access to the Redux store state and passes it as an
// argument to the selector function
export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectLastFetchType = (state) => state.posts.lastFetchType;

// exports reducer created by createSlice and is used in the store
export default postsSlice.reducer;
