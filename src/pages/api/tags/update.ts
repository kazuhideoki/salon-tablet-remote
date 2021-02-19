import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiTagsUpdata = async (
  params: ApiTagsUpdata
): Promise<ApiResponse> => {
  return apiWrapPost('tags/update', params);
};

export type ApiTagsUpdata = {
  tag_id: number;
  tag_name: string;
};

const update = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const params: ApiTagsUpdata = req.body;

    try {
      const data = await db(`UPDATE tags SET ? WHERE tag_id = ?`, [
        params,
        params.tag_id,
      ]);
      console.log('/tags/update/は ' + JSON.stringify(data));

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/tags/update/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default update;
