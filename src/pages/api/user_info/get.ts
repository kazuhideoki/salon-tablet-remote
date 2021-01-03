import { apiWrapGet, TApiResponse } from '../../../lib/apiWrap';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';
import { TUserInfo } from '../../../app/Store/Interface';
import { userInfoParamsFromSql } from '../../../lib/userInfoParamsFromSql';

export const apiGetUserInfoFromEmail = async (
  email: string
): Promise<TApiResponse<TUserInfo>> => {
  return apiWrapGet(`user_info/get?email=${email}`);
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query as { email: string };

  try {
    const data = (await db(
      'select * from `user_info` where `user_email` = ?',
      email
    )) as TUserInfo[];

    const rawData = userInfoParamsFromSql(data[0]);
    if (data.length === 0) throw new Error('userInfoがありません');
    res.status(200).json({ err: false, rawData } as TApiResponse<TUserInfo>);
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
