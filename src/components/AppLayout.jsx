import { Outlet } from "react-router-dom";
import Logo from "./Logo.jsx";
import SearchBar from "../features/search/SearchBar";
import SubredditList from "./SubredditList";
import "./AppLayout.css";

/* The AppLayout component serves as the main layout for the application and includes the 
header with the logo and the search bar at the top and the subreddit links on the right side. 
The main content in the center will be passed in through outlet as children. */
function AppLayout() {
  return (
    <div className="layout">
      <header className="app-header">
        <Logo />
        <SearchBar />
      </header>

      <div className="app-body">
        <main className="app-main">
          <Outlet />
        </main>
        <aside className="sidebar">
          <SubredditList />
        </aside>
      </div>
    </div>
  );
}

export default AppLayout;
