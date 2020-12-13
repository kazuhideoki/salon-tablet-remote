import { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";

import { firebaseAdmin } from "../../../lib/auth/firebaseAdmin";


export type T_auth_get_session = {
  req: NextApiRequest | IncomingMessage
};
export type T_auth_get_session_body = {
  st_token: string
};

export type T_auth_get_session_return = {
  email: string;
  emailVerified: boolean
};;

const get_session = async (req: NextApiRequest, res: NextApiResponse) => {
    const { st_token }: T_auth_get_session_body = req.body;

    try {
      
      const token = await firebaseAdmin
        .auth()
        .verifyIdToken(st_token);

      console.log("get_sessionのtokenは " + token);

      const returnData: T_auth_get_session_return = {
        email: token.email,
        emailVerified: token.email_verified,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log("/auth/get_sessionのエラーは " + JSON.stringify(err));

      res.status(500).json({ err: true, data: { message: err.message } });
      
    }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default get_session;
