import { apiWrapGet, TApiResponse } from '../../../util/db/apiWrap';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../util/db/db';
import { UserInfo } from '../../../util/interface/Interface';
import { userInfoParamsFromSql } from '../../../util/db/userInfoParamsFromSql';

export const apiGetUserInfoFromEmail = async (
  email: string
): Promise<TApiResponse<UserInfo>> => {
  return apiWrapGet(`user_info/get?email=${email}`);
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query as { email: string };

  try {
    const data = (await db(
      'select * from `user_info` where `user_email` = ?',
      email
    )) as UserInfo[];

    const rawData = userInfoParamsFromSql(data[0]);
    if (data.length === 0) throw new Error('userInfoがありません');
    res.status(200).json({ err: false, rawData } as TApiResponse<UserInfo>);
  } catch (err) {
    console.log('/user_info/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as TApiResponse);
  }
};
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
