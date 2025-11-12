import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import the Amplify Authenticator and styles
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Import our new components
import UploadComponent from "./UploadComponent";
import FileListComponent from "./FileListComponent";

// Simple styling for the App layout
const appStyle = {
  fontFamily: "Arial, sans-serif",
  margin: "0 auto",
  maxWidth: "900px",
  padding: "20px",
};

const navStyle = {
  background: "#232f3e",
  padding: "10px",
  borderRadius: "5px",
};

const navLinkStyle = {
  color: "white",
  margin: "0 15px",
  textDecoration: "none",
  fontSize: "18px",
};

// 'signOut' and 'user' are passed in automatically by withAuthenticator
function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <div style={appStyle}>
        {/* Navigation Bar */}
        <nav style={navStyle}>
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/files" style={navLinkStyle}>
            My Files
          </Link>
          <button onClick={signOut} style={{ float: "right" }}>
            Logout
          </button>
        </nav>

        {/* Main Content Area */}
        <div style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/" element={<UploadComponent />} />
            <Route path="/files" element={<FileListComponent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Wrap the entire App export with the withAuthenticator
// This is the magic that adds the login page!
export default withAuthenticator(App);
