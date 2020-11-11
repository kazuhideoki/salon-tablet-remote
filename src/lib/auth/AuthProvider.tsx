import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase'
import { firebaseClient } from './firebaseClient';
import { useRouter } from 'next/router';

const AuthContext = createContext<TAuthContext>({
  user: null,
} as TAuthContext);
type TAuthContext = {
  //@ts-ignore
  user: firebaseClient.User | null
  signout: () => void
}


export function AuthProvider({ children }: any) {
  //@ts-ignore
  const [user, setUser] = useState<firebaseClient.User | null>(null);
  const router = useRouter()
  
  const signout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      router.push('/')
    }).catch(function(error) {
      // An error happened.
    });
  }

  useEffect(() => {
    // tokenが変わるのをチェックするリスナーを登録する。
    //@ts-ignore
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`auth changed`);
      console.log('userは ' + JSON.stringify(user))
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