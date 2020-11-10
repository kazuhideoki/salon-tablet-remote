import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase'
import { firebaseClient } from './firebaseClient';

//@ts-ignore
const AuthContext = createContext<TAuthContext>({
  user: null,
});
type TAuthContext = {
  user: firebaseClient.User | null
  signout: typeof signout
}

const signout = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

export function AuthProvider({ children }: any) {
  //@ts-ignore
  const [user, setUser] = useState<firebaseClient.User | null>(null);


  useEffect(() => {
    // tokenが変わるのをチェックするリスナーを登録する。
    //@ts-ignore
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`auth changed`);
      console.log('userは ' + JSON.stringify(user))
      console.log(user ? user.uid : 'NO USER');
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'token', token, {});
    });
  }, []);

  const values = { user, signout }

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};