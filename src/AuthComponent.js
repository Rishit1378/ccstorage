import React, { useState } from "react";
import { Auth } from "aws-amplify";

function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add states for confirmation code if signing up

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log("User logged in:", user);
      // Redirect to home page
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      console.log(
        "Sign up successful! Please check your email for a confirmation code."
      );
      // Show confirmation step
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // ... Add inputs and buttons for email, password, and confirmation code
  // ... Add onClick={handleLogin} and onClick={handleSignUp}
  return <div>...Your Login/Sign Up Form UI from slide 44...</div>;
}
