import { apiWrapGet, ApiResponse } from '../../../util/db/apiWrap';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../util/db/db';
import { UserInfo, UserInfoFromDB } from '../../../util/interface/Interface';
import { userInfoParamsFromSql } from '../../../util/db/userInfoParamsFromSql';

export const apiGetUserInfoFromEmail = async (
  email: string
): Promise<ApiResponse<UserInfo>> => {
  return apiWrapGet(`user_info/get?email=${email}`);
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query as { email: string };

  try {
    const data = (await db(
      'select * from `user_info` where `user_email` = ?',
      email
    )) as UserInfoFromDB[];

    const rawData = userInfoParamsFromSql(data[0]) as UserInfo;
    if (data.length === 0) throw new Error('userInfoがありません');
    res.status(200).json({ err: false, rawData } as ApiResponse<UserInfo>);
  } catch (err) {
    console.log('/user_info/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
  }
};
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
