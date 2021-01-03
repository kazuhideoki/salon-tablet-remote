import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_user_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/apiWrap';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeShowArticleType = async (
  params: T_user_info_change_show_article_type
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/change_show_article_type', params);
};

export type T_user_info_change_show_article_type = {
  user_id: T_user_id;
  showArticleType: string;
};

const change_show_article_type = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const {
      user_id,
      showArticleType,
    }: T_user_info_change_show_article_type = req.body;

    try {
      await db(`UPDATE user_info SET show_article_type = ? where user_id = ?`, [
        showArticleType,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/user_info/change_show_article_type/のエラーは ' + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default change_show_article_type;
