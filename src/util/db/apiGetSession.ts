import { server, localhost } from '../../util/loadUrl';
import { parseCookies } from 'nookies';
import { ApiResponse } from './apiWrap';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

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

// ※get_sessionでfirebaseAdminを利用していて、フロント側で読んではいけない

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
