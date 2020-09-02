import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { tagIdsParse } from "../../../lib/tagIdsParse";
import { T_user_id, TArticles, TAllArticles, TPaginationParams } from "../../../app/Store/Types";
import { TApiResponse } from "../../../lib/apiTypes";
import { server, localhost } from "../../../config";
// import { session } from "next-auth/client";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesGet = async (articlesParam: T_articles_get): Promise<TApiResponse<T_articles_get_return>> => {
  
  const str = process.browser ? server : localhost

  const res = await fetch(
    `${str}/api/articles/get`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(articlesParam),
    }
  );

  return await res.json();
} 

export type T_articles_get = {
  page: number
  selectingTags: number[]
  isSetting: boolean;
  userId: T_user_id;
};


export type T_articles_get_return = {
  rawData: TArticles,
  pagination: TPaginationParams
  allArticles: TAllArticles
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log('articles/getだよ');
    
    
    const { page, selectingTags, isSetting, userId }: T_articles_get = req.body;
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    let getPublishedOnly: string;
    if (isSetting === false) {
      getPublishedOnly = `AND is_published = true `;
    } else if (isSetting === true) {
      getPublishedOnly = " ";
    }

    // 正規表現でタグを検索

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
    const offSet = skipRows === 0 ? '' : skipRows + ","; 

    const query =
      `SELECT * FROM articles WHERE user_id = ${userId} ` +
      getPublishedOnly +
      getTagedPages + `ORDER BY created_at DESC LIMIT ` +
      offSet +
      ` 5`;
      
    try {
      // await isSession(req)
         
      let data: any = await db(
        query
      );

      const query2 =
        `SELECT user_id FROM articles WHERE user_id = ${userId} ` +
        getPublishedOnly +
        getTagedPages;
      console.log(query2);

      const data2: any = await db(query2);  

      const query3 = `SELECT article_id, title FROM articles WHERE user_id = ${userId}`;
      const data3 = await db(query3);
      
      const pagination: TPaginationParams = {
        page: page,
        pageCount: data2.length ? Math.ceil(data2.length / 5) : 0, // 全row数を5で割って切り上げ
        pageSize: 5,
        rowCount: data2.length,
      };

      const returnData: T_articles_get_return = {
        // tag_idsをnumber[]化する、なければnullのまま
        rawData: data.length ? tagIdsParse(data) : data,
        pagination: pagination,
        allArticles: data3 as TAllArticles
      };

      return res.status(200).json(returnData);

    } catch (err) {
      console.log("/articles/get/のエラーは " + JSON.stringify(err));

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

export default get