import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiUserInfoCreate = async (
  params: ApiUserInfoCreate
): Promise<ApiResponse<void>> => {
  return apiWrapPost('user_info/create', params);
};

export type ApiUserInfoCreate = {
  user_email: string;
};

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { user_email }: ApiUserInfoCreate = req.body;

    try {
      await db(`INSERT INTO user_info (user_email) VALUES (?)`, [user_email]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/user_info/create/のエラーは ' + JSON.stringify(err));

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
export default create;
