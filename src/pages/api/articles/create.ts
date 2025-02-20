import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { DataTypeArticle } from '../../../util/interface/Interface';
import { ApiResponse } from '../../../util/db/apiWrap';
import { checkIsAdmin } from '../../../util/db/checkIsAdmin';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiArticlesCreate = async (
  params: ApiArticlesCreate
): Promise<ApiResponse> => {
  return apiWrapPost('articles/create', params);
};

export type ApiArticlesCreate = {
  is_published: boolean;
  title: string;
  article_content: string;
  article_excerpt: string;
  article_img: string;
  tag_ids: string | null;
  data_type: DataTypeArticle;
  user_id: number;
};

const create = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const params: ApiArticlesCreate = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      await db(`INSERT INTO articles SET ?`, params);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/articles/create/のエラーは ' + JSON.stringify(err));

      res.status(500).json({ err: true, rawData: err } as ApiResponse);
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

export default create;
