import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
} from "../features/posts/postsListSlice";
import { fetchSubredditPosts } from "../features/posts/postsListSlice";
import PostsList from "../features/posts/PostsList";
// SubredditPosts component fetches and displays posts from a specific subreddit
function SubredditPosts() {
  const { subreddit } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  // fetchSubreddit Posts is dispatched when the component mounts or when the subreddit changes
  useEffect(() => {
    dispatch(fetchSubredditPosts(subreddit));
  }, [dispatch, subreddit]);

  if (status === "loading") {
    return <p>Loading posts from r/{subreddit}...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>r/{subreddit}</h1>
      <PostsList posts={posts} />
    </section>
  );
}

export default SubredditPosts;
