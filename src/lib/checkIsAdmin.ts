import { NextApiRequest } from 'next';
import { apiGetUserInfoFromEmail } from '../pages/api/user_info/get';
import { getSession } from './auth/getSession';

type TCheckIsAdmin = {
  req: NextApiRequest;
};

export const checkIsAdmin = async ({
  req,
}: TCheckIsAdmin): Promise<boolean> => {
  const session = await getSession({ req });
  if (session && session.email) {
    const userInfo = await apiGetUserInfoFromEmail(session.email);
    if (userInfo) return userInfo.is_admin;
  }

  return false;
};
