import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts } from "../../../app/Store/Store";
import { server, instagramRedirectHost } from "../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("get_long_tokenだよ");
  


  // console.log("paramsは " + JSON.stringify(params));

  try {
    // const response = await fetch(
    //   `https://api.instagram.com/oauth/access_token`,
    //   {
    //     // headers: { "Content-Type": "application/json" },
    //     headers: { "Content-Type": "multipart/form-data" },
    //     method: "POST",
    //     body: JSON.stringify(params),
    //   }
    // );
    // // const data = await response.json();
    // const data = response;

    // console.log("get_long_tokenでの返り値は " + JSON.stringify(data));

    // res.writeHead(302, { Location: "/" });
    // res.end();
  } catch (err) {
    console.log(
      "/instagram_accounts/get_long_token/のエラーは " + JSON.stringify(err)
    );
    return res.status(500).json({ err: true, data: { message: err.message } });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
