// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports"; // Import your config

Amplify.configure(awsconfig); // Configure Amplify

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
