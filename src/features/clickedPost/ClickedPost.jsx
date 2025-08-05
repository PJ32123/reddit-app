import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchClickedPost,
  selectClickedPost,
  selectClickedComments,
  selectClickedPostStatus,
  selectClickedPostError,
  resetClickedPost,
} from "./clickedPostSlice";
// This utility function checks if a URL is an image based on its extension
// It can be used to conditionally render images in the ClickedPost component
// .test(url) runs the regex against the string url.
// Returns true if it matches (the URL ends with a valid image extension).
// Returns false otherwise.
// the $ at the end is what forces the match to happen at the end of the string
// Without the $, it would match any string that contains the image extension anywhere in it.
const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const ClickedPost = () => {
  // useParams is a hook from react-router-dom that allows you to access the URL parameters
  // These are destructured from the URL, which is defined in the route configuration in App.jsx
  const { subreddit, postId } = useParams();
  const dispatch = useDispatch();
  const clickedPost = useSelector(selectClickedPost);
  const comments = useSelector(selectClickedComments);
  const status = useSelector(selectClickedPostStatus);
  const error = useSelector(selectClickedPostError);

  // useEffect is a React hook that runs the fetchClickedPost thunk when the component mounts
  // or when subreddit or postId changes
  useEffect(() => {
    dispatch(fetchClickedPost({ subreddit, postId }));
    // Cleanup function to reset the clicked post state when the component unmounts
    return () => {
      dispatch(resetClickedPost());
    };
  }, [dispatch, subreddit, postId]);

  if (status === "loading") {
    return <p>Loading post...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!clickedPost) {
    return null;
  }
  // Check if the clicked post's URL is an image by checking its extension
  const isImage = isImageUrl(clickedPost.url);
  // Render the clicked post details and its comments
  // The post's title, author, and content are displayed
  // If the post has an image URL, it is displayed as well
  // Comments are listed below the post content
  return (
    <section>
      <h2>{clickedPost.title}</h2>
      <p>Posted by u/{clickedPost.author}</p>
      {isImage && (
        <img
          src={clickedPost.url}
          alt={clickedPost.title}
          style={{ maxWidth: "100%", margin: "1rem 0" }}
        />
      )}
      <p>{clickedPost.selftext}</p>
      <h3>Comments:</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <p>
              <strong>u/{c.author}</strong>: {c.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClickedPost;
