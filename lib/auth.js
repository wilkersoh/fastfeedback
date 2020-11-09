import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { createUser } from './db';
import firebase from './firebase';

export const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      const { token, ...userWithoutToken } = user; // destructed token, dont save token inside database

      setUser(user); // we need the token in our local state, so we can forward this token to our backend
      createUser(user.uid, userWithoutToken);

      /**
        Set cookies for magic login if the user was login "(index.js) Head script "
      */
      Cookies.set('fast-feedback-auth', true, {
        expires: 1 // expires 1 day
      });

      // Router.push('/site');
      return user;
    } else {
      Router.push('/');
      setUser(false);
      Cookies.remove('fast-feedback-auth');
      return false;
    }
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout
  };
}

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true); // fetch current data
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole;
};

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.ya, // information about user, took this secure token to communicate between client side and server side, so client side will seend over this to service side, then using functionf from firebase to make sure that i am who i say i am
    provider: user.providerData[0].providerId,
    stripeRole: await getStripeRole(),
    photoUrl: user.photoURL
  };
};
