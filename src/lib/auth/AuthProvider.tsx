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
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        nookies.set(undefined, 'emailVerified', '', {});
        return;
      }

      const emailVerified = user.emailVerified === true ? 'true' :  'false'

      console.log('user.emailVerifiedは ' + JSON.stringify(user.emailVerified))

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'token', token, {});
      nookies.set(undefined, 'emailVerified', emailVerified, {});
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