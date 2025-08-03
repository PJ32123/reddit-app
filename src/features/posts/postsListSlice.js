import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk 1: Home (front page or r/a+b+c)
export const fetchHomePosts = createAsyncThunk(
  "posts/fetchHomePosts",
  async () => {
    const res = await fetch("https://www.reddit.com/.json");
    const json = await res.json();
    return json.data.children.map((child) => child.data);
  }
);

// Thunk 2: Subreddit (like r/reactjs)
export const fetchSubredditPosts = createAsyncThunk(
  "posts/fetchSubredditPosts",
  async (subreddit) => {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await res.json();
    return json.data.children.map((child) => child.data);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    lastFetchType: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // HOME
    builder
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
      });

    // SUBREDDIT
    builder
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

export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectLastFetchType = (state) => state.posts.lastFetchType;
export default postsSlice.reducer;
