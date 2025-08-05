import { Link, useParams } from "react-router-dom";
import "./SubredditList.css";
// Define a list of subreddits to be displayed in the sidebar
// This is a static list, but could be fetched from an API in a real application
export const subreddits = [
  "wheeloftime",
  "lotr",
  "dune",
  "harrypotter",
  "eragon",
  "asoiaf",
  "mistborn",
  "fantasy",
];

const SubredditList = () => {
  // Grab the subreddit key from the object returned by use Params and stores its value in a new variable
  // called selected. A fancy way of writing:
  // const params = useParams();
  // const selected = params.subreddit;
  const { subreddit: selected } = useParams();
  return (
    <ul className="subreddit-list">
      <li>
        <Link to="/" className={!selected ? "active" : ""}>
          Home
        </Link>
      </li>
      {subreddits.map((sub) => (
        <li key={sub}>
          <Link to={`/r/${sub}`} className={sub === selected ? "active" : ""}>
            r/{sub}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubredditList;
