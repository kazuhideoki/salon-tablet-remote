import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_user_id, T_tag_name } from '../../../app/Store/Interface';
import { server, localhost } from '../../../lib/loadUrl';
import { TApiResponse } from '../../../lib/apiWrap';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsCreate = async (
  params: T_tags_create
): Promise<TApiResponse<T_tags_create>> => {
  return apiWrapPost('tags/create', params);
};

export type T_tags_create = {
  user_id: T_user_id;
  tag_name: T_tag_name;
};

export type T_tags_create_return = {
  rawData: unknown;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_tags_create = req.body;

    try {
      const data = await db(`INSERT INTO tags SET ?`, params);
      console.log('/tags/create/は ' + JSON.stringify(data));

      const returnData: T_tags_create_return = {
        rawData: data,
      };
      res.status(200).json(returnData);
    } catch (err) {
      console.log('/tags/create/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, data: err });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default create;
