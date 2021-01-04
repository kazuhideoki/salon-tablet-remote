import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_user_id, T_tag_name } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/db/apiWrap';
import { apiWrapPost } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsCreate = async (
  params: T_tags_create
): Promise<TApiResponse> => {
  return apiWrapPost('tags/create', params);
};

export type T_tags_create = {
  user_id: T_user_id;
  tag_name: T_tag_name;
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
