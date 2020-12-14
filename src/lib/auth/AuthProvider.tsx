import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseClient } from './firebaseClient';
import { useRouter } from 'next/router';

const AuthContext = createContext<TAuthContext>({
  user: null,
} as TAuthContext);
type TAuthContext = {
  //@ts-ignore
  user: firebaseClient.User | null
  signout: (path: string) => void
}


export function AuthProvider({ children }: any) {
  //@ts-ignore
  const [user, setUser] = useState<firebaseClient.User | null>(null);
  const router = useRouter()
  
  const signout = (path: string) => {
    firebase.auth().signOut().then(function() {
      router.push(path)
    }).catch(function(error) {
      
    });
  }

  useEffect(() => {
    // tokenが変わるのをチェックするリスナーを登録する。
    //@ts-ignore
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'st_token', '', {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, 'st_token', token, {});
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