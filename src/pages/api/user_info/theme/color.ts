import { db } from '../../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../../util/db/apiWrap';
import { apiWrapPost } from '../../../../util/db/apiWrap';

export const apiUserInfoThemeColor = async (
  params: ApiUserInfoThemeColor
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/theme/color', params);
};

export type ApiUserInfoThemeColor = {
  user_id: number;
  theme_color: string;
};

const color = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, theme_color }: ApiUserInfoThemeColor = req.body;

    try {
      await db(`UPDATE user_info SET theme_color = ? where user_id = ?`, [
        theme_color,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/user_info/theme/color/のエラーは ' + JSON.stringify(err));
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

export default color;
