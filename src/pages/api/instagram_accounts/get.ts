import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TInstagramAccounts, T_user_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsGet = async (
  user_id: T_user_id
): Promise<TApiResponse<TInstagramAccounts>> => {
  return apiWrapGet(`instagram_accounts/get?userId=${user_id}`);
};

const changeToBooleanFromNumberInstagramAcconts = (
  data: TInstagramAccounts
) => {
  return data.map((value) => {
    //@ts-ignore
    value.is_reconnect_needed = value.is_reconnect_needed === 1 ? true : false;

    return value;
  });
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data = (await db(
      'SELECT * FROM instagram_accounts WHERE user_id = ?',
      // queryは文字列で来るため
      Number(req.query.userId)
    )) as TInstagramAccounts;

    data = data.map((value) => {
      //@ts-ignore
      delete value.access_token;
      return value;
    });

    const rawData: TInstagramAccounts = changeToBooleanFromNumberInstagramAcconts(
      data
    );
    res
      .status(200)
      .json({ err: false, rawData } as TApiResponse<TInstagramAccounts>);
  } catch (err) {
    console.log('/instagram_accounts/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as TApiResponse);
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
