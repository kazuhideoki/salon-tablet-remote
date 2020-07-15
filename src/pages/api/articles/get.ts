import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { tagIdsParse } from "../lib/tagIdsParse";
// import { session } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // const sessionObj = await session({ req });
    
    const { page, isSetting, userId } = req.body;
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    let getPublishedOnly: string;
    if (isSetting === false) {
      // getPublishedOnly = `WHERE 'is_published' = true`
      getPublishedOnly = `AND is_published = true`;
    } else if (isSetting === true) {
      getPublishedOnly = "";
    }
    const skipRows = 5 * (page - 1); // オフセット, 何ページ飛ばすか
    // const offSet = skipRows === 0 ? "" : skipRows + ","; 
    const offSet = skipRows === 0 ? '' : skipRows + ","; 

    try {
      const query =
        `SELECT * FROM articles WHERE user_id = ${userId} ` +
        getPublishedOnly +
        ` ORDER BY created_at DESC LIMIT ` +
        offSet +
        ` 5`;
        
      let data:any = await db(
        query
        // [getPublishedOnly, offSet]
      );
      const query2 =
        `SELECT * FROM articles WHERE user_id = ${userId} ` + getPublishedOnly;
      // console.log(query2);
      
      const data2: any = await db(
        query2
      );

      console.log("/articles/get/は " + JSON.stringify(data));


      if (data.length) {
        // tag_idsをnumber[]化する
        data = tagIdsParse(data)
      }


      let pageCount
      if (data2.length) {
        pageCount = Math.ceil(data2.length / 5) // 全row数を5で割って切り上げ
      } else {
        pageCount = 0
      }


      let rowCount
      if (data2.length) {
        rowCount = data2.length
      } else {
        rowCount = 0
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
