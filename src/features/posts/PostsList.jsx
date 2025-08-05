import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchTerm } from "../search/searchSlice";
import "./PostsList.css";

// Utility function to slugify post titles for URL compatibility
// Converts the title to lowercase, removes non-word characters, trims whitespace,
// and replaces spaces with hyphens to create a URL-friendly string.
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
// PostsList component that displays a list of posts
// This is called in the Home and Subreddit components where posts are passed as props
function PostsList({ posts }) {
  const searchTerm = useSelector(selectSearchTerm);
  // Filters posts based on the search term
  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;
  // If there are no posts or the filteredPosts array is empty, display a message
  if (!filteredPosts || filteredPosts.length === 0) {
    return <p>No posts available.</p>;
  }
  // Maps over the filteredPosts array and returns a list of posts
  // Each post's title is wrapped in a Link component that navigates to the clicked post's details page
  // The post's title is displayed as a heading and the author is shown below it
  // If the post has an image URL, it is displayed as an image element
  return (
    <ul className="posts-list">
      {filteredPosts.map((post) => (
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
          {post.imageUrl && <img src={post.imageUrl} alt="" />}
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
