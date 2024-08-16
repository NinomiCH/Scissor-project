// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// Create a context to store the authentication state
const AuthContext = createContext<User | null>(null);

// Custom hook to easily access the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides the authentication state to the entire app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the authenticated user in state
      setLoading(false); // Set loading to false once the state is set
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  // If the authentication state is still loading, display a loading message
  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // Provide the authenticated user to the rest of the app
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
