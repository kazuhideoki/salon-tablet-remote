import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, instagramRedirectHost, localhost } from "../../../config";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { TSessionOnj } from '../../index'

var FormData = require("form-data");

export default async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("get_tokenだよ");

  if (req.query.error) {
    console.log();
    ("インスタグラムアカウントの接続ができませんでした。");
    fetch(`${server}`)
  }

  // ドキュメントを見ると curlでformdataでやっていた。
  const form = new FormData()
  form.append("client_id", process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID);
  form.append("client_secret", process.env.INSTAGRAM_APP_SECRET);
  //@ts-ignore
  form.append("code", req.query.code );
  form.append("grant_type", "authorization_code");
  form.append(
    "redirect_uri",
    `${instagramRedirectHost}/api/instagram_accounts/get_token`
  );

  console.log("paramsは " + JSON.stringify(form));
  

  try {
        const response = await fetch(
          `https://api.instagram.com/oauth/access_token`,
          {
            method: "POST",
            body: form,
          }
        );
        console.log(JSON.stringify(response));

        const shortLived = await response.json();

        console.log(
          "get_token, short lived tokenでの返り値は " + JSON.stringify(shortLived)
        );

        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        const response2 = await fetch(
          `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortLived.access_token}`
        );
        const longLived = await response2.json();

        console.log(
          "get_token, long lived tokenでの返り値は " + JSON.stringify(longLived)
        );

        const response3 = await fetch(
          `https://graph.instagram.com/me/?fields=username&access_token=${longLived.access_token}`
        );
        
        const userProfile = await response3.json();
        console.log("userProfileは " + JSON.stringify(userProfile));

        const sessionObj2: TSessionOnj = await getSession({ req });
        console.log("sessionObj2は " + JSON.stringify(sessionObj2));
        

        const params = {
          instagram_id: shortLived.user_id,
          // instagramアカウントのusername
          username: userProfile.username,
          // ↓取得方法がないかも？
          profile_img: '',
          access_token: longLived.access_token,
          expires: null, // いつか実装
          // SALON TABLETのuser_id
          user_id: null, // ★★★要実装★★★
        }

        console.log(JSON.stringify(params));
        
        // DBに保存する
        // const data3 = db(`INSERT instagram_accounts  = ?, access_token = ?`)


        res.writeHead(302, {Location: "/",});
        res.end();

      } catch (err) {
    console.log(
      "/instagram_accounts/get_token/のエラーは " + JSON.stringify(err)
    );
    return res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};


