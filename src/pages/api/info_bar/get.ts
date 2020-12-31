import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TInfoBar, T_user_id, TInfoBarData } from "../../../app/Store/Interface";
import { localhost, server } from "../../../lib/loadUrl";
import { TApiResponse, TApiError } from "../../../lib/apiTypes";
import { createInitInfoBar } from "../../../lib/createInitInfoBar";
import { apiWrapGet } from "../../../lib/apiWrap";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarGet = async (
         user_id: T_user_id
       ): Promise<TApiResponse<TInfoBarData>> => {
         return apiWrapGet(`info_bar/get?userId=${user_id}`);
       };

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId: T_user_id = Number(req.query.userId);

  try {
    //@ts-ignore
    let data: TInfoBar[] = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      "SELECT * FROM info_bar WHERE user_id = ?",
      userId
    );
    // console.log('info_bar/getのdataは ' + JSON.stringify(data));

    // 初回サインインのときなどでinfo_barがない場合、新しく作る。作ったデータが返ってくる
    if (data.length === 0) {
      data = await createInitInfoBar(userId)
    }

    const article_id = data[0].selected_article_id;

    // selected_article_idがセットされていれば該当記事取得
    let data2 = [] as any
    if (article_id) {
      data2 = await db(
        `SELECT * FROM articles WHERE article_id = ?`,
        article_id
      );
    }

    const returnData: TInfoBarData = {
      infoBar: data[0] as TInfoBar,
      // scrolling_animation_duration: null,
      targetArticle: data2.length ? data2[0] : [],
    };

    return res.status(200).json(returnData);

  } catch (err) {
    console.log("/info_bar/get/のエラーは " + JSON.stringify(err));
    return res.status(500).json({ err: true, data: err });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
