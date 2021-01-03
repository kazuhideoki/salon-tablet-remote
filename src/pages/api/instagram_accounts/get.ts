import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TInstagramAccounts, T_user_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/apiWrap';
import { server, localhost } from '../../../lib/loadUrl';
import { changeToBooleanFromNumberInstagramAcconts } from '../../../lib/changeToBooleanFromNumber';
import { LeakRemoveTwoTone } from '@material-ui/icons';
import { apiWrapGet } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsGet = async (
  user_id: T_user_id
): Promise<TApiResponse<TInstagramAccounts>> => {
  return apiWrapGet(`instagram_accounts/get?userId=${user_id}`);
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

    const returnData: TInstagramAccounts = changeToBooleanFromNumberInstagramAcconts(
      data
    );

    return res.status(200).json(returnData);
  } catch (err) {
    console.log('/instagram_accounts/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, data: err });
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
