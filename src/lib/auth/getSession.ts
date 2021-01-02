import { server, localhost } from '../../lib/loadUrl';
import { parseCookies } from 'nookies';
import {
  T_auth_get_session,
  T_auth_get_session_return,
} from '../../pages/api/auth/get_session';

export const getSession = async (
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

    const result = await res.json();
    if (result.err) return null;
    if (result.mail === null) return null;

    return result;
  } catch (err) {
    return null;
  }
};
