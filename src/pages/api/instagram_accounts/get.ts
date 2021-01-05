import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { InstagramAccounts } from '../../../util/interface/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsGet = async (
  user_id: number
): Promise<TApiResponse<InstagramAccounts>> => {
  return apiWrapGet(`instagram_accounts/get?userId=${user_id}`);
};

const changeToBooleanFromNumberInstagramAcconts = (data: InstagramAccounts) => {
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
    )) as any[];

    data = data.map((value) => {
      //@ts-ignore
      delete value.access_token;
      return value;
    }) as InstagramAccounts;

    const rawData: InstagramAccounts = changeToBooleanFromNumberInstagramAcconts(
      data
    );
    res
      .status(200)
      .json({ err: false, rawData } as TApiResponse<InstagramAccounts>);
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
