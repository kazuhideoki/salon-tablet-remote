import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts } from "../../../app/Store/Store";
import { server, instagramRedirectHost } from "../../../config";
var FormData = require("form-data");

var util = require("util");
var exec = require("child_process").exec;

// https://salon-tablet.com/?code=AQA1VuCMkgSM3CJR90vnbsB92i_rnrqtDwvIiT72emi5DLf_vfmKbB2Yaf4-rIIBPJIg5pC0A5cBJ-2pJ9NDgUSvIzU5-wM7keOF0aQDvMQEUUufhiG2oZxnEFNAsuV0i5M2R97EMxrjUOyE5lD89KnvYP5hcNEQFM6AiTqVuWCNazer8mlR9QtGO8V3Rw6MJkEAVuXASQd3r_hLhlPwW5qJJbNEmVp_vxsUbbMUVoJaXw#_

// code, 

export default async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("get_tokenだよ");

  // if (req.body.access_token) {
  //   // 短期トークンが帰ってきたときの処理
  //   console.log(JSON.stringify(req.body));
    
  // }

  if (req.query.error) {
    console.log();
    ("インスタグラムアカウントの接続ができませんでした。");
    fetch(`${server}`)
  }

  const params = {
    client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_APP_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `${instagramRedirectHost}/`,
  };

  console.log("paramsは " + JSON.stringify(params));

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
  

  try {
        const response = await fetch(
          `https://api.instagram.com/oauth/access_token`,
          {
            // headers: { "Content-Type": "application/json" },
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            // headers: { "Content-Type": "multipart/form-data" },
            method: "POST",
            // body: JSON.stringify(params),
            // body: params,
            body: form,
          }
        );
        console.log(JSON.stringify(response));

        const data = await response.json();

        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        // const request = require("request");

        // const options = {
        //   url: "https://api.instagram.com/oauth/access_token",
        //   method: "POST",
        //   form: params,
        // };

        // const callback = (error, response, body) => {
        //   console.log('responseは ' + JSON.stringify(response) + "bodyは " + JSON.stringify(body));
        //   if (!error && response.statusCode == 200) {
        //     console.log(body);
        //     return body
        //   }

        // }

        // const data = await request(options, callback);

        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        // const command = `curl -X POST https://api.instagram.com/oauth/access_token -F client_id=${
        //   process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID
        // } -F client_secret=${
        //   process.env.INSTAGRAM_APP_SECRET
        // } -F grant_type=authorization_code  -F redirect_uri=${`${instagramRedirectHost}/`} -F code=${
        //   req.query.code
        // }`;

        // console.log(command);

        // const data = await exec(command, function(error, stdout, stderr) {
        //   console.log("stdout: " + stdout);
        //   console.log("stderr: " + stderr);

        //   if (error !== null) {
        //     console.log("exec error: " + error);
        //   }
        //   return stdout;
        // });

        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        console.log(
          "get_token, short lived tokenでの返り値は " + JSON.stringify(data)
        );

        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        const response2 = await fetch(
          `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${data.access_token}`
        );
        // const data = await response.json();
        const data2 = await response2.json();

        console.log(
          "get_token, long lived tokenでの返り値は " + JSON.stringify(data2)
        );

        res.status(302).write("/");
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


