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
// HomePosts component fetches and displays posts for the home feed
function HomePosts() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const lastFetchType = useSelector(selectLastFetchType);
  // Fetch home posts when the component mounts, the status changes, or the last fetch type changes
  // Last fetch type is changed to "home" when home posts are fetched
  // If last fetch type changes something other than "home", it will fetch home posts again
  useEffect(() => {
    // If the status is idle or the last fetch type is not "home", fetch home posts
    if (status === "idle" || lastFetchType !== "home") {
      dispatch(fetchHomePosts());
    }
  }, [dispatch, status, lastFetchType]);
  // If the status is loading, show a loading message
  if (status === "loading") {
    return <p>Loading home posts...</p>;
  }
  // If the status is failed, show an error message
  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  // If there are no posts, show a message indicating no posts are available
  return (
    <section>
      <h2>Home Feed</h2>
      {posts.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <p>No posts available. Please check back later.</p>
      )}
    </section>
  );
}

export default HomePosts;
