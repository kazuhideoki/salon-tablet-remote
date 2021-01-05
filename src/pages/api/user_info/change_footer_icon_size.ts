import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeFooterIconSize = async (
  params: T_user_info_change_footer_icon_size
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/change_footer_icon_size', params);
};

export type T_user_info_change_footer_icon_size = {
  user_id: number;
  footer_icon_size: string;
};

const change_footer_icon_size = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const {
      user_id,
      footer_icon_size,
    }: T_user_info_change_footer_icon_size = req.body;

    try {
      await db(`UPDATE user_info SET footer_icon_size = ? where user_id = ?`, [
        footer_icon_size,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/user_info/change_footer_icon_size/のエラーは ' + JSON.stringify(err)
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

export default change_footer_icon_size;
