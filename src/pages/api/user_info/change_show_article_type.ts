import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_user_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { apiWrapPost } from "../../../lib/apiWrap";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeShowArticleType = async (
  params: T_user_info_change_show_article_type
): Promise<TApiResponse<T_user_info_change_show_article_type_return>> => {
  return apiWrapPost(params, "user_info/change_show_article_type");
};

export type T_user_info_change_show_article_type = {
  user_id: T_user_id;
  showArticleType: string;
};
export type T_user_info_change_show_article_type_return = {
  rawData: unknown;
};

const change_show_article_type = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    // await runMiddleware(req, res);

    const {
      user_id,
      showArticleType,
    }: T_user_info_change_show_article_type = req.body;

    try {
      // ※db(``)の返り値は常に[]
      const data = await db(
        `UPDATE user_info SET show_article_type = ? where user_id = ?`,
        [showArticleType, user_id]
      );

      console.log("change_show_article_typeの返り値は " + JSON.stringify(data));

      const returnData: T_user_info_change_show_article_type_return = {
        rawData: data,
      };
      return res.status(200).json(returnData);
    } catch (err) {
      console.log("/user_info/change_show_article_type/のエラーは " + JSON.stringify(err));
      return res.status(500).json({ err: true, data: err });
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

export default change_show_article_type;
