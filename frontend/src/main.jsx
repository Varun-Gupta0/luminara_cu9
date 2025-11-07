import "./styles.css";  // Import styles first
import "./styles/global.css"; // <-- ADD THIS LINE
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const rootEl = document.getElementById("root");
if (!rootEl) {
  // Helpful early error if the container is missing
  // (prevents an uncaught exception and gives a clearer console message)
  // If you still see a blank page, check that `index.html` contains <div id="root"></div>
  // and that the dev server served the correct file.
  // eslint-disable-next-line no-console
  console.error('Root element not found: #root');
} else {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </React.StrictMode>
  );
}
