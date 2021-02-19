import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  InfoBar,
  InfoBarData,
  InfoBarWithoutId,
} from '../../../util/interface/Interface';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapGet } from '../../../util/db/apiWrap';

export const apiInfoBarGet = async (
  user_id: number
): Promise<ApiResponse<InfoBarData>> => {
  return apiWrapGet(`info_bar/get?userId=${user_id}`);
};

const createInitInfoBar = async (user_id: number) => {
  const params: InfoBarWithoutId = {
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
  )) as InfoBar[];

  return data;
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const userId = Number(req.query.userId);

  try {
    let data = (await db(
      // column名を囲むときは``がよいか？''ではエラーにならないが、ORDER BY が作動しなかった。
      'SELECT * FROM info_bar WHERE user_id = ?',
      userId
    )) as InfoBar[];

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

    const rawData: InfoBarData = {
      infoBar: data[0] as InfoBar,
      targetArticle: data2.length ? data2[0] : [],
    };

    res.status(200).json({ err: false, rawData } as ApiResponse<InfoBarData>);
  } catch (err) {
    console.log('/info_bar/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
