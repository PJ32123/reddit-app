import { Link } from "react-router-dom";

// Utility function to slugify strings, which can be useful for creating URLs
// This will be used with the post title to create a URL-friendly version
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}

// Reusable PostsList component
function PostsList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <ul>
      {posts.map((post) => {
        let imageUrl = post.preview?.images?.[0]?.source?.url?.replaceAll(
          "&amp;",
          "&"
        );
        return (
          <li key={post.id}>
            <div>
              <Link
                to={`/r/${post.subreddit}/comments/${post.id}/${slugify(
                  post.title
                )}`}
              >
                <h2>{post.title}</h2>
              </Link>
              <p>Posted by u/{post.author}</p>
            </div>
            {/* Optional thumbnail */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                style={{
                  width: "50%",
                  maxHeight: "600px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default PostsList;
