import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "./firebaseAdmin";
import { parseCookies } from "nookies";
import { IncomingMessage, ServerResponse } from "http";

export type TSession = {
  email: string;
  emailVerified: boolean
};
// export type TSession = firebase.admin.auth.DecodedIdToke;

type TGetSession = {
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  failAndRedirect?: boolean
}

export const getSession = async ({
         req,
         res,
         failAndRedirect = false,
       }: TGetSession): Promise<TSession> => {
         try {
           const cookies = parseCookies({ req });
           const token = await firebaseAdmin
             .auth()
             .verifyIdToken(cookies["token"]);
           const emailVerified = cookies['email_verified'] === 'true' ? true : false
           console.log('getSessionのtoken.email_verifiedは ' + token.email_verified)
           console.log('getSessionのemailVerifiedは ' + emailVerified)
          //  const result = { email: token.email, emailVerified: emailVerified };
           const result = { email: token.email, emailVerified: emailVerified };

           console.log('getSessionのresultは ' + JSON.stringify(result))
           res.end()
           return result

         } catch (err) {
           console.log("errは " + JSON.stringify(err));

           if (failAndRedirect) {
             res.writeHead(302, { Location: "/auth/signin" });
             res.end();
           }

           return null;
         }
       };