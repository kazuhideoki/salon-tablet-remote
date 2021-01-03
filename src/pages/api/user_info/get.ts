import { apiWrapGet } from '../../../lib/apiWrap';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import { TUserInfo } from '../../../app/Store/Interface';
import { userInfoParamsFromSql } from '../../../lib/userInfoParamsFromSql';

export const apiGetUserInfoFromEmail = async (
  email: string
): Promise<TUserInfo> => {
  return apiWrapGet(`user_info/get?email=${email}`);
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query as { email: string };

  try {
    const data = (await db(
      'select * from `user_info` where `user_email` = ?',
      email
    )) as TUserInfo[];

    if (data.length) {
      const returnData = userInfoParamsFromSql(data[0]);
      return res.status(200).json(returnData);
    } else {
      throw new Error('userInfoがありません');
    }
  } catch (err) {
    console.log('/user_info/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, data: err });
  }
};
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
