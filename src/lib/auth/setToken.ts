import nookies from "nookies";
import firebase from "firebase/app";
import "firebase/auth";

export const setToken = async (user: firebase.User) => {
         const token = await user.getIdToken();

         nookies.set(undefined, "st_token", token, {
           maxAge: 30 * 24 * 60 * 60,
           // pathを指定したらcookieがgSSRで取得できた
           path: "/",
         });
       };