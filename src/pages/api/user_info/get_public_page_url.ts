import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cipher } from "../../../module/bcrypt";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { TSessionOnj } from "../..";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { T_user_id, T_public_page_url } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiGetPublicPageUrl = async (
  params: T_user_info_get_public_page_url
): Promise<TApiResponse<T_user_info_get_public_page_url_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/get_public_page_url?userId=${params.user_id}`);

  return await res.json();
};

export type T_user_info_get_public_page_url = { user_id: T_user_id };
export type T_user_info_get_public_page_url_return = {
  publlic_page_url: T_public_page_url;
};

const get_public_page_url = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    const user_id = req.query.userId 

    const sessionObj: TSessionOnj = await getSession({ req });
    const { email } = sessionObj.user;

    // url生成
    const publlic_page_url = cipher(email + user_id);

    try {
      const data = await db(`SELECT publlic_page_url FROM user_info WHERE user_id = ?`, [Number(user_id)]);

      const returnData: T_user_info_get_public_page_url_return = {
        publlic_page_url: data[0].publlic_page_url,
      };

      res.status(200).json(returnData);
    } catch (err) {
      console.log(
        "/user_info/get_public_page_url/のエラーは " + JSON.stringify(err)
      );

      res.status(500).json({ err: true, data: { message: err.message } });
    }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
  },
};
export default get_public_page_url;
