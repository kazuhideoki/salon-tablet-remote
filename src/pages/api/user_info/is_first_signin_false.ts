import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiIsFirsSigninFalse = async (
  params: ApiIsFirsSigninFalse
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/is_first_signin_false', params);
};

type ApiIsFirsSigninFalse = {
  user_id: number;
};

const is_first_signin_false = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { user_id } = req.body as ApiIsFirsSigninFalse;
    try {
      await db(
        `UPDATE user_info SET is_first_sign_in = 0 WHERE user_id = ?`,
        user_id
      );
      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log(
        '/user_info/is_first_signin_false/のエラーは ' + JSON.stringify(err)
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
export default is_first_signin_false;
