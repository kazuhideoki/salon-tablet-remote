import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { page, isSetting } = req.body;
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    let getPublishedOnly: string;
    if (isSetting === false) {
      // getPublishedOnly = `WHERE 'is_published' = true`
      getPublishedOnly = `WHERE is_published = true`;
    } else if (isSetting === true) {
      getPublishedOnly = "";
    }
    const skipRows = 5 * (page - 1); // オフセット, 何ページ飛ばすか
    // const offSet = skipRows === 0 ? "" : skipRows + ","; 
    const offSet = skipRows === 0 ? '' : skipRows + ","; 

    try {
      const query =
        `SELECT * FROM articles ` +
        getPublishedOnly +
        ` ORDER BY created_at DESC LIMIT ` +
        offSet +
        ` 5`;
      const data = await db(
        query
        // [getPublishedOnly, offSet]
      );

      const data2: any = await db(
        `SELECT * FROM articles` + getPublishedOnly
      );

      console.log("/articles/get/は " + JSON.stringify(data));

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
          page: 1,
          pageCount: Math.ceil(data2.length / 5), // 全row数を5で割って切り上げ
          pageSize: 5,
          rowCount: data2.length,
          // page: page,
          // pageCount: pageCount, // 全row数を5で割って切り上げ
          // pageSize: 5,
          // rowCount: rowCount,
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
