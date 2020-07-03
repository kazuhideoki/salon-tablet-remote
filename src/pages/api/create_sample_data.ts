import { db } from "./lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TArticle } from "../../app/Store/Store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") { 
    console.log("create_sample_data.tsだよ");
    

  const user_id = req.body

    try {
      // まずis_sample_dataの記事を取得
      const data: any = await db(
        `SELECT * FROM articles WHERE is_sample_data = '1' ORDER BY created_at DESC`
      );
      // console.log(JSON.stringify("dataは " + data));
      
      const params = data.map((article: TArticle) => {
        delete article.article_id;
        delete article.created_at;
        delete article.updated_at;
        
        article.is_sample_data = false
        article.user_id = user_id;
        return article
      })
      console.log(JSON.stringify("params[0].titleは " + params[0].title));
      console.log(JSON.stringify("params[1].titleは " + params[1].title));
      console.log(JSON.stringify("params[2].titleは " + params[2].title));
      // is_sample_dataの記事をコピーする
      // ↓記事の数だけ?をつける
      // const data2 = await db(`INSERT INTO articles SET ?,?,?`, [params[0],params[1],params[2]]);
      // ↓全部いっぺんにやる方法あるはず
      const data20 = await db(`INSERT INTO articles SET ?`, params[0]);
      const data21 = await db(`INSERT INTO articles SET ?`, params[1]);
      const data22 = await db(`INSERT INTO articles SET ?`, params[2]);

      // console.log("data2は " + data2);
      
      const data3 = await db(`UPDATE user_info SET is_first_sign_in = '0' WHERE user_id = ?;`, user_id);
      console.log("data3は " + JSON.stringify(data3));


      res.end()


    } catch (err) {
      console.log("/create_sample_dataのエラーは " + JSON.stringify(err));
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
