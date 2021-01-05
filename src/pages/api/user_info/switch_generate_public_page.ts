import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoSwitchGeneratePublicPage = async (
  params: ApiUserInfoSwitchGeneratePublicPage
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/switch_generate_public_page', params);
};

export type ApiUserInfoSwitchGeneratePublicPage = {
  user_id: number;
  is_generate_public_page: boolean;
};

const switch_generate_public_page = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const {
      is_generate_public_page,
      user_id,
    }: ApiUserInfoSwitchGeneratePublicPage = req.body;

    try {
      await db(
        `UPDATE user_info SET is_generate_public_page = ? WHERE user_id = ?`,
        [is_generate_public_page, user_id]
      );

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/user_info/switch_generate_public_page/のエラーは ' +
          JSON.stringify(err)
      );
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

export default switch_generate_public_page;
