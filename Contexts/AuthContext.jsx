'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isServerValidated, setIsServerValidated] = useState(() => {
    // Read from sessionStorage when the app initializes
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isServerValidated') === 'true';
    }
    return false;
  });

  // Dev-only superadmin bypass flag
  const [isSuperAdmin, setIsSuperAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isSuperAdmin') === 'true';
    }
    return false;
  });

  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear the session cookie (via an API route)
      await fetch('/api/logout', {
        method: 'POST',
      });
      setIsServerValidated(false);
      setIsSuperAdmin(false);
      sessionStorage.removeItem('isSuperAdmin');
      router.push('/auth/login');
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Persist isServerValidated to sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isServerValidated', isServerValidated);
    }
  }, [isServerValidated]);

  // Persist isSuperAdmin to sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isSuperAdmin', isSuperAdmin);
    }
  }, [isSuperAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isServerValidated,
        setIsServerValidated,
        isSuperAdmin,
        setIsSuperAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
