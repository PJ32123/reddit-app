import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHomePosts } from "../features/posts/postsListSlice";

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
