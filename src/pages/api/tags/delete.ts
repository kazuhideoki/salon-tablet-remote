import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import {
  T_tag_ids,
  T_tag_id,
  T_user_id,
  T_article_id,
} from "../../../app/Store/Types";
import { deleteTagIdInArticle } from "../lib/deleteTagIdInArticle";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsDelete = async (params: T_tags_delete):Promise<TApiResponse<T_tags_delete_return>> => {
  let str = process.browser ? server : localhost

  const res = await fetch(`${str}/api/tags/delete`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
} 

export type T_tags_delete = {tag_id: T_tag_id, user_id: T_user_id}
export type T_tags_delete_return = {
  rawData: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { tag_id, user_id }: T_tags_delete = req.body;

    try {
      // articleのtag_idsの該当タグを消す。DBのtab_idsは文字列だが、うまいこと該当タグのtag_id:numberだけをを削除する
      deleteTagIdInArticle(tag_id, user_id);

      // ★タグそのものを消す
      const data2 = await db(
        `DELETE FROM tags WHERE tag_id = ?`,
        tag_id
      );

      const returnData: T_tags_delete_return = {
        rawData: data2,
      };
      return res.status(200).json(returnData);
      
    } catch (err) {
      console.log("/tags/delete/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: { message: err.message } });
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
