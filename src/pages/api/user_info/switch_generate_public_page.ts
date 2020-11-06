import { db } from "../../../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../module/bcrypt";
import { T_user_id, T_is_generate_public_page } from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoSwitchGeneratePublicPage = async (
  params: T_user_info_switch_generate_public_page
): Promise<TApiResponse<T_user_info_switch_generate_public_page_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/switch_generate_public_page`, {
    headers: { "Content-Type": "application/json"},
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_user_info_switch_generate_public_page = {
  user_id: T_user_id
  is_generate_public_page: T_is_generate_public_page
};
export type T_user_info_switch_generate_public_page_return = {
  is_generate_public_page: boolean;
};

const switch_generate_public_page = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    console.log('switch_generate_public_pageのreq.bodyは ' + JSON.stringify(req.body));
    
    const {
      is_generate_public_page,
      user_id,
    }: T_user_info_switch_generate_public_page = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `UPDATE user_info SET is_generate_public_page = ? WHERE user_id = ?`,
        [is_generate_public_page, user_id]
      );

        console.log("/user_info/switch_generate_public_page/は " + JSON.stringify(data));

        const returnData: T_user_info_switch_generate_public_page_return = {
          is_generate_public_page: is_generate_public_page
        };

        return res.status(200).json(returnData);

    } catch (err) {
      console.log(
        "/user_info/switch_generate_public_page/のエラーは " + JSON.stringify(err)
      );
      res.status(500).json({ err: true, data: { message: err.message } });
    }
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

export default switch_generate_public_page;
