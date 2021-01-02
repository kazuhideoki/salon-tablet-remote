import { NextApiRequest } from 'next';
import { getSession } from './auth/getSession';
import { getUserInfoFromEmail } from './getUserInfoFromEmail';

type TCheckIsAdmin = {
  req: NextApiRequest;
};

export const checkIsAdmin = async ({
  req,
}: TCheckIsAdmin): Promise<boolean> => {
  const session = await getSession({ req });
  if (session && session.email) {
    const userInfo = await getUserInfoFromEmail(session.email);
    if (userInfo) return userInfo.is_admin;
  }

  return false;
};
