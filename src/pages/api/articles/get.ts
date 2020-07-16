import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { tagIdsParse } from "../lib/tagIdsParse";
import { T_user_id } from "../../../app/Store/Store";
// import { session } from "next-auth/client";

export type T_articles_get = {
  page: number
  selectingTags: number[]
  isSetting: boolean;
  userId: T_user_id;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    
    const { page, selectingTags, isSetting, userId }: T_articles_get = req.body;
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    let getPublishedOnly: string;
    if (isSetting === false) {
      // getPublishedOnly = `WHERE 'is_published' = true`
      getPublishedOnly = `AND is_published = true `;
    } else if (isSetting === true) {
      getPublishedOnly = " ";
    }
    // 正規表現でタグを検索できるよう ex) [14] [3,25]
    // ^(?=.*(\[|,)?15(,|\])?)(?=.*(\[|,)?32(,|\])?).*$ こんな感じ
    // ↑tag_idを数字に入れ込んで文字列でつなげる
    let getTagedPages;
    if (selectingTags.length === 0) {
      getTagedPages = ''
    } else {
      // mapで正規表現配列化
      const regExpTagsArray = selectingTags.map((value) => {
        return `'[[:<:]]${value}[[:>:]]'`;
      })
      // 正規表現連結、sql文化
      getTagedPages = `AND tag_ids REGEXP ${regExpTagsArray.join(" AND tag_ids REGEXP ")} `;
    }

    const skipRows = 5 * (page - 1); // オフセット, 何ページ飛ばすか
    // const offSet = skipRows === 0 ? "" : skipRows + ","; 
    const offSet = skipRows === 0 ? '' : skipRows + ","; 

    const query =
      `SELECT * FROM articles WHERE user_id = ${userId} ` +
      getPublishedOnly +
      getTagedPages + `ORDER BY created_at DESC LIMIT ` +
      offSet +
      ` 5`;
      console.log(query);
      
    try {
          // 例）
          // SELECT tag_ids FROM articles WHERE tag_ids REGEXP '[[:<:]]15[[:>:]]' AND tag_ids REGEXP '[[:<:]]14[[:>:]]';

          let data: any = await db(
            query
          );

          const query2 =
            `SELECT * FROM articles WHERE user_id = ${userId} ` +
            getPublishedOnly +
            getTagedPages;
          console.log(query2);

          const data2: any = await db(query2);

          console.log("/articles/get/は " + JSON.stringify(data));

          if (data.length) {
            // tag_idsをnumber[]化する
            data = tagIdsParse(data);
          }

          let pageCount;
          if (data2.length) {
            pageCount = Math.ceil(data2.length / 5); // 全row数を5で割って切り上げ
          } else {
            pageCount = 0;
          }

          let rowCount;
          if (data2.length) {
            rowCount = data2.length;
          } else {
            rowCount = 0;
          }

          res.status(200).json({
            rawData: data,
            pagination: {
              page: page,
              pageCount: Math.ceil(data2.length / 5), // 全row数を5で割って切り上げ
              pageSize: 5,
              rowCount: data2.length,
            },
          });
        } catch (err) {
      console.log("/articles/get/のエラーは " + JSON.stringify(err));

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
