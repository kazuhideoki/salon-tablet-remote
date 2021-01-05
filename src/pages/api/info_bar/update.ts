import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  T_info_bar_type,
  T_scrolling_sentence,
  T_selected_article_id,
  T_user_id,
  T_scrolling_animation_duration,
} from '../../../app/Store/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarUpdate = async (
  params: T_info_bar_update
): Promise<TApiResponse> => {
  return apiWrapPost('info_bar/update', params);
};

export type T_info_bar_update = {
  user_id: T_user_id;
  info_bar_type: T_info_bar_type;
  scrolling_sentence: T_scrolling_sentence;
  scrolling_animation_duration: T_scrolling_animation_duration;
  selected_article_id: T_selected_article_id;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_info_bar_update = req.body;

    try {
      await db(`UPDATE info_bar SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/info_bar/update/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default update;
