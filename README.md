# reddit-app

This project was built as the final project for Codecademy’s Front-End Development course.
It allows a user to browse a predefined list of subreddits, which includes some of my favorite fantasy book series. This is not a completed project and is only designed to run in a development server.

## Setup and Installation

1. Clone the project and navigate to it
   git clone https://github.com/your-username/reddit-app.git
   cd reddit-app

2. Install dependencies
   Make sure you have Node.js (LTS) and npm installed.
   npm install

3. Start the development server
   npm run dev

## Features

- Uses React Router for client-side navigation.

- Homepage shows posts from all listed subreddits combined.

- Search bar filters posts in real-time as you type.

- Click a subreddit name in the sidebar to view posts from only that subreddit.

- Click a post title to open a detail view that shows:

  - The post content (including images when available)

  - All comments for the post

- Fully responsive layout:

  - Sidebar is vertical on desktop

  - On mobile, the subreddit list moves to a horizontal bar at the bottom

## Technologies Used

- React – component-based UI

- Redux Toolkit – state management and async thunks for API calls

- React Router v6 – routing between home, subreddit, and post pages

- Vite – fast development build tool

- Fetch API – retrieving data from Reddit’s JSON API

- CSS – Flexbox layout with media queries for responsiveness

## Component List

### Layout Components

#### AppLayout

Wraps the entire app with a header, search bar, and sidebar.
Contains the <Outlet> where child pages render.

#### Logo

- Displays the site title (“Reddit”) and links back to the homepage.

#### SearchBar

- Input for filtering posts in real-time; includes a clear button.
- Hidden on the ClickedPost route.

#### SubredditList

- Sidebar component that lists predefined subreddits.
- Highlights the active subreddit link.

### Page Components

#### HomePosts

- Fetches and displays posts from all predefined subreddits.

#### SubredditPosts

- Fetches and displays posts from a single subreddit.

#### ClickedPost

- Shows the full details of a post and all comments.

#### NotFound

- Displays a 404 message for unmatched routes.

### Reusable Components

#### PostsList

- Renders a list of posts, each with title, author, and optional image.

#### PostItem (optional)

- Could be extracted from PostsList to handle a single post’s markup.

#### State Slices (Redux Toolkit)

- postsSlice – Stores the currently loaded posts, loading status, and error state.

- clickedPostSlice – Stores a single clicked post’s data and its comments.

- searchSlice – Stores the current search term for filtering posts.

## How It Works

- The app starts on / (HomePosts) and loads posts from all predefined subreddits using Reddit’s multi-subreddit JSON endpoint.

- Posts are stored in Redux state and rendered via the PostsList component.

- The SearchBar filters the visible posts in Redux state as the user types.

- Clicking a subreddit link in SubredditList loads only posts from that subreddit.

- Clicking a post navigates to /r/:subreddit/comments/:postId/:postTitle and fetches:

- The clicked post data

- The associated comments

- Data fetching is handled in Redux thunks (fetchHomePosts, fetchSubredditPosts, fetchClickedPost), with loading and error states managed in slices.

## Future Improvements

- Support Reddit galleries and videos in posts

- Add infinite scroll to load more posts

- User authentication to allow voting or commenting

- Dark mode toggle
