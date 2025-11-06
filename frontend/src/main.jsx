import "./styles.css";  // Import styles first
import React from "react";
import { createRoot } from "react-dom/client";
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
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
