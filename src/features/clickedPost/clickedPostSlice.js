import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFromReddit } from "../../utils/fetchFromReddit";

// A thunk to fetch a specific post and its comments
// This is used when a user clicks on a post to view its details
// Creates an action with type "clickedPost/fetchClickedPost/pending, fulfilled or rejected"
// and a payload of post and comments
// Dispatching fetchClickedPost runs the async function and updates the Redux state according to the result.
// The thunk itself returns a promise that resolves to the final action, usually fulfilled or rejected.
export const fetchClickedPost = createAsyncThunk(
  "clickedPost/fetchClickedPost",
  // The returned function is an async function that fetches the post and its comments
  async ({ subreddit, postId }) => {
    const json = await fetchFromReddit(`/r/${subreddit}/comments/${postId}`);

    // Checks if post exists and if not, fails early with a clear error message
    if (!json[0]?.data?.children?.length) {
      throw new Error("Post not found or no data returned.");
    }

    const post = json[0].data.children[0].data;
    // Normalizes the post's image URL
    post.imageUrl =
      post.preview?.images?.[0]?.source?.url?.replaceAll("&amp;", "&") ||
      post.url_overridden_by_dest ||
      (post.thumbnail && post.thumbnail.startsWith("http")
        ? post.thumbnail
        : null);
    // Extracts comments from the second part of the response
    // If map returns undefined, defaults to an empty array
    const comments = json[1]?.data?.children?.map((c) => c.data) || [];
    // Returns an object with the post and its comments that will be the action payload
    return { post, comments };
  }
);
// Creates a slice that stores the clicked post and its comments
const clickedPostSlice = createSlice({
  name: "clickedPost",
  initialState: {
    post: null,
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetClickedPost: (state) => {
      state.post = null;
      state.comments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  // Handles the actions created by the thunk above
  // The state is the current state of the slice
  // fetchClickedPost.pending references the action type created by the thunk when the fetch is initiated
  // fetchClickedPost.fulfilled references the action type created by the thunk when the fetch is successful
  // fetchClickedPost.rejected references the action type created by the thunk when the fetch fails
  extraReducers: (builder) => {
    builder
      .addCase(fetchClickedPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClickedPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(fetchClickedPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors used with useSelector that has access to the Redux store state and passes it as an
export const selectClickedPost = (state) => state.clickedPost.post;
export const selectClickedComments = (state) => state.clickedPost.comments;
export const selectClickedPostStatus = (state) => state.clickedPost.status;
export const selectClickedPostError = (state) => state.clickedPost.error;
// Deconstructs and exports the actions from the slice to be used in components
export const { resetClickedPost } = clickedPostSlice.actions;
// Exports the reducer created by createSlice and is used in the store
export default clickedPostSlice.reducer;
