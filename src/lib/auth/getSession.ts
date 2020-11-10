import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { firebaseAdmin } from "./firebaseAdmin";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export const getSession = async (
         context: GetServerSidePropsContext<ParsedUrlQuery>,
         failAndRedirect = false
       ) => {
         try {
           const cookies = parseCookies(context);
           // console.log('cookiesは ' + JSON.stringify(cookies))
           const token = await firebaseAdmin
             .auth()
             .verifyIdToken(cookies["token"]);
           // console.log('tokenは ' + JSON.stringify(token))
           // the user is authenticated!
           const { uid, email } = token;

           return { email }

         } catch (err) {
           console.log("errは " + JSON.stringify(err));

           if (failAndRedirect) {
             context.res.writeHead(302, { Location: "/auth/signin" });
             context.res.end();
           }

           return null

         }
       };