import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Tags } from '../../../util/interface/Interface';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapGet } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsGet = async (
  user_id: number
): Promise<ApiResponse<Tags>> => {
  return apiWrapGet(`tags/get?userId=${user_id}`);
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const data = (await db(
      'SELECT * FROM tags WHERE user_id = ?',
      // queryは文字列で来るため
      Number(req.query.userId)
    )) as Tags;

    res.status(200).json({ err: false, rawData: data } as ApiResponse<Tags>);
  } catch (err) {
    console.log('/tags/get/のエラーは ' + JSON.stringify(err));
    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
