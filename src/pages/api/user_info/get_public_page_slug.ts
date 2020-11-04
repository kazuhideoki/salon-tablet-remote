import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cipher } from "../../../module/bcrypt";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { TSessionOnj } from "../..";
// import { getCsrfToken, getSession, providers } from "next-auth/client";
import { T_user_id, T_public_page_slug } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiGetPublicPageSlug = async (
  params: T_user_info_get_public_page_slug
): Promise<TApiResponse<T_user_info_get_public_page_slug_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/user_info/get_public_page_slug?userId=${params.user_id}`);

  return await res.json();
};

export type T_user_info_get_public_page_slug = { user_id: T_user_id };
export type T_user_info_get_public_page_slug_return = {
  publlic_page_slug: T_public_page_slug;
};

const get_public_page_slug = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    const user_id = req.query.userId 

    // 【要修正】
    // const sessionObj: TSessionOnj = await getSession({ req });
    // const { email } = sessionObj.user;

    const email = 'cutterkaz@gmail.com'

    // slug生成
    const publlic_page_slug = cipher(email + user_id);

    try {
      const data = await db(`SELECT publlic_page_slug FROM user_info WHERE user_id = ?`, [Number(user_id)]);

      const returnData: T_user_info_get_public_page_slug_return = {
        publlic_page_slug: data[0].publlic_page_slug,
      };

      res.status(200).json(returnData);
    } catch (err) {
      console.log(
        "/user_info/get_public_page_slug/のエラーは " + JSON.stringify(err)
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
export default get_public_page_slug;
