import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_tag_id, T_tag_name } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/db/apiWrap';
import { apiWrapPost } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsUpdata = async (
  params: T_tags_update
): Promise<TApiResponse> => {
  return apiWrapPost('tags/update', params);
};

export type T_tags_update = {
  tag_id: T_tag_id;
  tag_name: T_tag_name;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_tags_update = req.body;

    try {
      const data = await db(`UPDATE tags SET ? WHERE tag_id = ?`, [
        params,
        params.tag_id,
      ]);
      console.log('/tags/update/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/tags/update/のエラーは ' + JSON.stringify(err));

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

export default update;
