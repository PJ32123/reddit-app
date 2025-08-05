import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./store.js";

// Render the main App component wrapped in StrictMode and Redux Provider
// StrictMode is a tool for highlighting potential problems in an application
// Provider makes the Redux store available to the rest of the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
