import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { IncomingMessage } from "http";
import { parseCookies } from "nookies";
import { firebaseAdmin } from "../../../lib/auth/firebaseAdmin";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const getSession = async (
  params: T_auth_get_session
): Promise<TApiResponse<T_auth_get_session_return>> => {
  let str = process.browser ? server : localhost;

  const st_token = parseCookies({ req: params.req })["st_token"];
  console.log('getSessionのst_tokenは ' + st_token)

  const res = await fetch(`${str}/api/auth/get_session`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({st_token}),
  });
  // const res = await fetch(`${str}/api/auth/get_session`);

  const result =  await res.json();

  if (result.err) {
    return null
  }

  return result
};

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
  // if (req.method === "POST") {
    const { st_token }: T_auth_get_session_body = req.body;

    try {
      
      // const cookies = parseCookies({ req });
      // console.log('get_sessionのcookiesは ' + JSON.stringify(cookies))
      const token = await firebaseAdmin
        .auth()
        // .verifyIdToken(cookies["st_token"]);
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
  // } 
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
