import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchClickedPost,
  selectClickedPost,
  selectClickedComments,
  selectClickedPostStatus,
  selectClickedPostError,
  resetClickedPost,
} from "./clickedPostSlice";

const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const ClickedPost = () => {
  const { subreddit, postId } = useParams();
  const dispatch = useDispatch();
  const clickedPost = useSelector(selectClickedPost);
  const comments = useSelector(selectClickedComments);
  const status = useSelector(selectClickedPostStatus);
  const error = useSelector(selectClickedPostError);

  useEffect(() => {
    dispatch(fetchClickedPost({ subreddit, postId }));

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
    console.log("it all happened so fast");
    return null;
  }

  const isImage = isImageUrl(clickedPost.url);

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
