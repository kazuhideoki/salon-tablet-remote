import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { DataTypeArticle } from '../../../util/interface/Interface';
import { checkIsAdmin } from '../../../util/db/checkIsAdmin';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesUpdate = async (
  params: ApiArticlesUpdate
): Promise<ApiResponse> => {
  return apiWrapPost('articles/update', params);
};

export type ApiArticlesUpdateParams = {
  is_published: boolean;
  title: string;
  article_content: string;
  article_excerpt: string;
  article_img: string;
  tag_ids: string | null;
  data_type: DataTypeArticle;
};
// dbに そのまま入れられるように paramsとwhereに使うidは分けておく
export type ApiArticlesUpdate = {
  params: ApiArticlesUpdateParams;
  article_id: number;
};

const update = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { params }: ApiArticlesUpdate = req.body;
    const id: number = req.body.article_id;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      await db(`UPDATE articles SET ? WHERE article_id = ?`, [params, id]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/articles/update/のエラーは ' + JSON.stringify(err));

      res.status(500).json({ err: true, rawData: err } as ApiResponse);
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
