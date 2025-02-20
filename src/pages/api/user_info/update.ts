import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiUserInfoUpdate = async (
  params: ApiUserInfoUpdate
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/update', params);
};

export type ApiUserInfoUpdate = {
  user_id: number;
  user_name: string;
  shop_name: string;
  user_email: string;
  is_generate_public_page: boolean;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: ApiUserInfoUpdate = req.body;

    try {
      const data = await db(`UPDATE user_info SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);
      console.log('/user_info/update/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/user_info/update/のエラーは ' + JSON.stringify(err));

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
export default update;
