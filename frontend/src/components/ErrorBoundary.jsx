import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // log to console for developer debugging
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong while rendering the app</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#b91c1c" }}>
            {String(this.state.error)}
          </pre>
          <div style={{ marginTop: 12 }}>
            Try reloading the page. If the problem persists, check the browser console for details.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
