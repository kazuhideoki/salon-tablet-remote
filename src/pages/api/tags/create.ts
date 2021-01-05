import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsCreate = async (
  params: T_tags_create
): Promise<TApiResponse> => {
  return apiWrapPost('tags/create', params);
};

export type T_tags_create = {
  user_id: number;
  tag_name: string;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_tags_create = req.body;

    try {
      const data = await db(`INSERT INTO tags SET ?`, params);
      console.log('/tags/create/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/tags/create/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default create;
