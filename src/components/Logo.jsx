import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHomePosts } from "../features/posts/postsListSlice";

// Logo component displays the Reddit logo and links to the home page
// Clicking the logo will dispatch an action to fetch home posts
function Logo() {
  const dispatch = useDispatch();
  return (
    <div className="logo">
      <Link to="/" onClick={() => dispatch(fetchHomePosts())}>
        <h1>Reddit</h1>
      </Link>
    </div>
  );
}

export default Logo;
