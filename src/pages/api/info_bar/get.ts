import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  TInfoBar,
  T_user_id,
  TInfoBarData,
  TInfoBarWithoutId,
} from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/db/apiWrap';
import { apiWrapGet } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarGet = async (
  user_id: T_user_id
): Promise<TApiResponse<TInfoBarData>> => {
  return apiWrapGet(`info_bar/get?userId=${user_id}`);
};

const createInitInfoBar = async (user_id: T_user_id) => {
  const params: TInfoBarWithoutId = {
    user_id: user_id,
    info_bar_type: 'shop_name',
    scrolling_sentence: '',
    scrolling_animation_duration: 8,
    selected_article_id: null,
  };

  await db(`INSERT INTO info_bar SET ?`, params);

  const data = (await db(
    // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
    'SELECT * FROM info_bar WHERE user_id = ?',
    user_id
  )) as TInfoBar[];

  return data;
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId: T_user_id = Number(req.query.userId);

  try {
    //@ts-ignore
    let data: TInfoBar[] = await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      'SELECT * FROM info_bar WHERE user_id = ?',
      userId
    );

    // 初回サインインのときなどでinfo_barがない場合、新しく作る。作ったデータが返ってくる
    if (data.length === 0) {
      data = await createInitInfoBar(userId);
    }

    const article_id = data[0].selected_article_id;

    // selected_article_idがセットされていれば該当記事取得
    let data2 = [] as any;
    if (article_id) {
      data2 = await db(
        `SELECT * FROM articles WHERE article_id = ?`,
        article_id
      );
    }

    const rawData: TInfoBarData = {
      infoBar: data[0] as TInfoBar,
      targetArticle: data2.length ? data2[0] : [],
    };

    res.status(200).json({ err: false, rawData } as TApiResponse<TInfoBarData>);
  } catch (err) {
    console.log('/info_bar/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as TApiResponse);
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
