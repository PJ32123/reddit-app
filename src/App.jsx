import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import AppLayout from "./components/AppLayout.jsx";
import HomePosts from "./pages/HomePosts.jsx";
import SubredditPosts from "./pages/SubredditPosts.jsx";
import ClickedPost from "./features/clickedPost/ClickedPost.jsx";
import NotFound from "./pages/NotFound.jsx";

// Create a router with routes for the application
const router = createBrowserRouter(
  createRoutesFromElements(
    // The parent route is the AppLayout which wraps all other routes
    <Route path="/" element={<AppLayout />}>
      {/* index means this is the default child route for its parent route. */}
      {/* HomePosts doesn't have it's own path. */}
      <Route index element={<HomePosts />} />
      {/* This path is accessed when a subreddit is clicked and routes to SubredditPosts*/}
      <Route path="r/:subreddit" element={<SubredditPosts />} />
      {/* This path is accessed when a post title is clicked and routes to ClickedPost*/}
      <Route
        path="r/:subreddit/comments/:postId/:postTitle"
        element={<ClickedPost />}
      />
      {/* Catch-all route for any unmatched paths, rendering NotFound component */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
// Create the main App component that returns the RouterProvider with the defined router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
