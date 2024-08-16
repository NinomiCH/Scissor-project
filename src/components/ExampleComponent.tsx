// src/components/ExampleComponent.tsx
"use client";

import { signInWithGoogle, logout, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./ExampleComponent.css";

const ExampleComponent = () => {
  const [user] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="example-component">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default ExampleComponent;
