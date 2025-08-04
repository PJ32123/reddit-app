import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// A thunk to fetch a specific post and its comments
// This is used when a user clicks on a post to view its details
export const fetchClickedPost = createAsyncThunk(
  "clickedPost/fetchClickedPost",
  async ({ subreddit, postId }) => {
    const url = `/reddit/r/${subreddit}/comments/${postId}.json`;
    const res = await fetch(url);
    const json = await res.json();

    // Extract the post and comments
    const post = json[0].data.children[0].data;
    const comments = json[1].data.children.map((c) => c.data);

    return { post, comments };
  }
);

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

export const selectClickedPost = (state) => state.clickedPost.post;
export const selectClickedComments = (state) => state.clickedPost.comments;
export const selectClickedPostStatus = (state) => state.clickedPost.status;
export const selectClickedPostError = (state) => state.clickedPost.error;
export const { resetClickedPost } = clickedPostSlice.actions;
export default clickedPostSlice.reducer;
