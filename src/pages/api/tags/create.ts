import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiTagsCreate = async (
  params: ApiTagsCreate
): Promise<ApiResponse> => {
  return apiWrapPost('tags/create', params);
};

export type ApiTagsCreate = {
  user_id: number;
  tag_name: string;
};

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const params: ApiTagsCreate = req.body;

    try {
      const data = await db(`INSERT INTO tags SET ?`, params);
      console.log('/tags/create/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/tags/create/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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
