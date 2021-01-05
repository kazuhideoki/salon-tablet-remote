import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TTags, T_user_id } from '../../../util/interface/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsGet = async (
  user_id: T_user_id
): Promise<TApiResponse<TTags>> => {
  return apiWrapGet(`tags/get?userId=${user_id}`);
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //@ts-ignore
    const data: TTags = await db(
      'SELECT * FROM tags WHERE user_id = ?',
      // queryは文字列で来るため
      Number(req.query.userId)
    );

    res.status(200).json({ err: false, rawData: data } as TApiResponse<TTags>);
  } catch (err) {
    console.log('/tags/get/のエラーは ' + JSON.stringify(err));
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
