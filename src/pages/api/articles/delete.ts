import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_article_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/apiWrap';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesDelete = async (
  params: T_articles_delete
): Promise<TApiResponse> => {
  return apiWrapPost('articles/delete', params);
};

export type T_articles_delete = {
  article_id: T_article_id;
};

const articles_delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { article_id }: T_articles_delete = req.body;

    try {
      await db(`DELETE FROM articles WHERE article_id = ?`, article_id);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/articles/delete/のエラーは ' + JSON.stringify(err));

      res.status(500).json({ err: true, data: err });
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

export default articles_delete;
