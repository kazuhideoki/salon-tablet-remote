import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiUserInfoChangeFooterIconSize = async (
  params: ApiUserInfoChangeFooterIconSize
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/change_footer_icon_size', params);
};

export type ApiUserInfoChangeFooterIconSize = {
  user_id: number;
  footer_icon_size: string;
};

const change_footer_icon_size = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      user_id,
      footer_icon_size,
    }: ApiUserInfoChangeFooterIconSize = req.body;

    try {
      await db(`UPDATE user_info SET footer_icon_size = ? where user_id = ?`, [
        footer_icon_size,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log(
        '/user_info/change_footer_icon_size/のエラーは ' + JSON.stringify(err)
      );
      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default change_footer_icon_size;
