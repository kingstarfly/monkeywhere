import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { createUser } from "./db";
import firebase from "./firebase";
import cookie from "js-cookie";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth(); // creates the initial custom auth object
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext); // retrieve the already created custom auth object
};

export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.user && !auth.loading) {
      router.push("/");
    }
  }, [auth, router]);
  return auth;
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user);
      setUser(user);

      // todo set cookie
      cookie.set("monkeywhere-auth", true, {
        expires: 1,
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);

      // todo remove cookie
      cookie.remove("monkeywhere-auth");

      setLoading(false);
      return false;
    }
  };

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);
        router.push("/map");
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        router.push("/");
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Return the user object and auth methods
  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
  };
};
