import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeShowArticleType = async (
  params: ApiUserInfoChangeShowArticleType
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/change_show_article_type', params);
};

export type ApiUserInfoChangeShowArticleType = {
  user_id: number;
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
    }: ApiUserInfoChangeShowArticleType = req.body;

    try {
      await db(`UPDATE user_info SET show_article_type = ? where user_id = ?`, [
        showArticleType,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log(
        '/user_info/change_show_article_type/のエラーは ' + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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

export default change_show_article_type;
