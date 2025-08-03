// features/posts/PostsList.jsx
function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>Posted by {post.author}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
