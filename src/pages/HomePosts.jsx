// src/pages/HomePosts.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchHomePosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  selectLastFetchType,
} from "../features/posts/postsListSlice";
import PostsList from "../features/posts/PostsList";

function HomePosts() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const lastFetchType = useSelector(selectLastFetchType);

  useEffect(() => {
    if (status === "idle" || lastFetchType !== "home") {
      dispatch(fetchHomePosts());
    }
  }, [dispatch, status, lastFetchType]);

  if (status === "loading") {
    return <p>Loading home posts...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Home Feed</h2>
      <PostsList posts={posts} />
    </section>
  );
}

export default HomePosts;
