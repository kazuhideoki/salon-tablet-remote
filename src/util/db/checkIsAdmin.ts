import { NextApiRequest } from 'next';
import { apiGetUserInfoFromEmail } from '../../pages/api/user_info/get';
import { apiGetSession } from './apiGetSession';

type Props = {
  req: NextApiRequest;
};

export const checkIsAdmin = async ({ req }: Props): Promise<boolean> => {
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
