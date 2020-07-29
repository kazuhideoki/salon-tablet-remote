import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInstagramAccounts } from "../../../app/Store/Store";
import { server } from "../../../config";

// https://salon-tablet.com/?code=AQA1VuCMkgSM3CJR90vnbsB92i_rnrqtDwvIiT72emi5DLf_vfmKbB2Yaf4-rIIBPJIg5pC0A5cBJ-2pJ9NDgUSvIzU5-wM7keOF0aQDvMQEUUufhiG2oZxnEFNAsuV0i5M2R97EMxrjUOyE5lD89KnvYP5hcNEQFM6AiTqVuWCNazer8mlR9QtGO8V3Rw6MJkEAVuXASQd3r_hLhlPwW5qJJbNEmVp_vxsUbbMUVoJaXw#_

// code, 

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.query.error) {
    alert("インスタグラムアカウントの接続ができませんでした。");
    fetch(`${server}`)
  }

  const params = {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_APP_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `${server}/`
  };

  try {
    const res = await fetch(`https://api.instagram.com/oauth/access_token`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(params),
    });
    const data = await res.json();

    console.log("connect_longでの返り値は " + data);

    alert("インスタグラム連携完了")
    fetch(server)
    

  } catch (err) {
    console.log(
      "/instagram_accounts/connect_long/のエラーは " + JSON.stringify(err)
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
