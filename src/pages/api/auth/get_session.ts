import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';
import { firebaseAdmin } from '../../../util/auth/firebaseAdmin';
import { ApiResponse } from '../../../util/db/apiWrap';
import { server, localhost } from '../../../util/loadUrl';
import { parseCookies } from 'nookies';

export const apiGetSession = async (
  params: ApiGetSession
): Promise<ApiGetSessionReturn | null> => {
  const str = typeof window !== 'undefined' ? server : localhost;

  const st_token = parseCookies({ req: params.req })['st_token'];

  if (!st_token) return null;

  try {
    const res = await fetch(`${str}/api/auth/get_session`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ st_token }),
    });

    const result = (await res.json()) as ApiResponse<ApiGetSessionReturn>;
    if (result.err) return null;
    if (result.rawData.email === null) return null;

    return result.rawData;
  } catch (err) {
    return null;
  }
};

export type ApiGetSession = {
  req: NextApiRequest | IncomingMessage;
};
export type ApiGetSession_body = {
  st_token: string;
};

export type ApiGetSessionReturn = {
  email: string | null;
  emailVerified: boolean | null;
};

const get_session = async (req: NextApiRequest, res: NextApiResponse) => {
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
