import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "./firebaseAdmin";
import { parseCookies } from "nookies";
import { IncomingMessage, ServerResponse } from "http";

export type TSession = {
  email: string;
};

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
           // console.log('cookiesは ' + JSON.stringify(cookies))
           const token = await firebaseAdmin
             .auth()
             .verifyIdToken(cookies["token"]);
           // console.log('tokenは ' + JSON.stringify(token))
           return { email: token.email };
         } catch (err) {
           console.log("errは " + JSON.stringify(err));

           if (failAndRedirect) {
             res.writeHead(302, { Location: "/auth/signin" });
             res.end();
           }

           return null;
         }
       };