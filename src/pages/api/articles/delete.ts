import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesDelete = async (
  params: ApiArticlesDelete
): Promise<ApiResponse> => {
  return apiWrapPost('articles/delete', params);
};

export type ApiArticlesDelete = {
  article_id: number;
};

const articles_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { article_id }: ApiArticlesDelete = req.body;

    try {
      await db(`DELETE FROM articles WHERE article_id = ?`, article_id);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/articles/delete/のエラーは ' + JSON.stringify(err));

      res.status(500).json({ err: true, data: err });
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

export default articles_delete;
