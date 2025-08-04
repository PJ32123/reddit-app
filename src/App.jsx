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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePosts />} />
      <Route path="r/:subreddit" element={<SubredditPosts />} />
      <Route
        path="r/:subreddit/comments/:postId/:postTitle"
        element={<ClickedPost />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
