import { NextApiRequest, NextApiResponse } from 'next';
import {
  ApiGetSession_body,
  ApiGetSessionReturn,
} from '../../../util/db/apiGetSession';
import { firebaseAdmin } from '../../../util/auth/firebaseAdmin';
import { ApiResponse } from '../../../util/db/apiWrap';

const get_session = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { st_token }: ApiGetSession_body = req.body;

  try {
    const token = await firebaseAdmin.auth().verifyIdToken(st_token);

    const rawData: ApiGetSessionReturn = {
      email: token.email || null,
      emailVerified: token.email_verified || null,
    };
    res
      .status(200)
      .json({ err: false, rawData } as ApiResponse<ApiGetSessionReturn>);
  } catch (err) {
    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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

export default get_session;
