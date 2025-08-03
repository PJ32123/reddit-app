import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHomePosts } from "../features/posts/postsListSlice";

const subreddits = [
  "wheeloftime",
  "lotr",
  "dune",
  "harrypotter",
  "eragon",
  "asoif",
  "mistborn",
  "fantasy",
];

const SubredditList = () => {
  /* Grab the subreddit key from the object returned by use Params and stores its value in a new variable 
    called selected. A fancy way of writing: 
    const params = useParams();
    const selected = params.subreddit; */
  const { subreddit: selected } = useParams();
  return (
    <ul>
      <li className="subreddit-list">
        <Link
          to="/"
          onClick={() => dispatch(fetchHomePosts())}
          className={!selected ? "active" : ""}
        >
          Home
        </Link>
      </li>
      {subreddits.map((sub) => (
        <li className="subreddit-list" key={sub}>
          <Link to={`/r/${sub}`} className={sub === selected ? "active" : ""}>
            r/{sub}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;
