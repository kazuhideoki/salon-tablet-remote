import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin';
import { TApiResponse } from '../../../lib/apiWrap';
import { server, localhost } from '../../../lib/loadUrl';
import { parseCookies } from 'nookies';

export const apiGetSession = async (
  params: T_auth_get_session
): Promise<T_auth_get_session_return | null> => {
  const str = process.browser ? server : localhost;

  const st_token = parseCookies({ req: params.req })['st_token'];

  if (!st_token) return null;

  try {
    const res = await fetch(`${str}/api/auth/get_session`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ st_token }),
    });

    const result = (await res.json()) as TApiResponse<T_auth_get_session_return>;
    if (result.err) return null;
    if (result.rawData.email === null) return null;

    return result.rawData;
  } catch (err) {
    return null;
  }
};

export type T_auth_get_session = {
  req: NextApiRequest | IncomingMessage;
};
export type T_auth_get_session_body = {
  st_token: string;
};

export type T_auth_get_session_return = {
  email: string | null;
  emailVerified: boolean | null;
};

const get_session = async (req: NextApiRequest, res: NextApiResponse) => {
  const { st_token }: T_auth_get_session_body = req.body;

  try {
    const token = await firebaseAdmin.auth().verifyIdToken(st_token);

    const rawData: T_auth_get_session_return = {
      email: token.email || null,
      emailVerified: token.email_verified || null,
    };
    res
      .status(200)
      .json({ err: false, rawData } as TApiResponse<T_auth_get_session_return>);
  } catch (err) {
    return res.status(500).json({ err: true, rawData: err } as TApiResponse);
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default get_session;
