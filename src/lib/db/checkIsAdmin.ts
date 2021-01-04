import { NextApiRequest } from 'next';
import { apiGetSession } from '../../pages/api/auth/get_session';
import { apiGetUserInfoFromEmail } from '../../pages/api/user_info/get';

type TCheckIsAdmin = {
  req: NextApiRequest;
};

export const checkIsAdmin = async ({
  req,
}: TCheckIsAdmin): Promise<boolean> => {
  try {
    const session = await apiGetSession({ req });
    if (session && session.email) {
      const data = await apiGetUserInfoFromEmail(session.email);
      return data.rawData.is_admin;
    }

    return false;
  } catch (err) {
    throw `checkIsAdmin: ${err}`;
  }
};
