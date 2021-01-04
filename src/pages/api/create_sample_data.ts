import { db } from '../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  FooterItems,
  FooterItem,
  T_user_id,
  TArticles,
} from '../../app/Store/Interface';
import { TApiResponse } from '../../lib/db/apiWrap';
import { apiWrapPost } from '../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCreateSampleData = async (
  params: T_create_sample_data
): Promise<TApiResponse<void>> => {
  return apiWrapPost('create_sample_data', params);
};

export type T_create_sample_data = {
  user_id: T_user_id;
};

const getSampleArticles = async (user_id: T_user_id) => {
  const data = (await db(
    `SELECT * FROM articles WHERE data_type = 'sample_data' ORDER BY created_at DESC`
  )) as TArticles;
  const params = data.map((article) => {
    delete article.article_id;
    delete article.created_at;
    delete article.updated_at;

    article.data_type = 'default_data';
    article.user_id = user_id;
    return article;
  });

  return params;
};

const insertSampleArticles = async (params: TArticles) => {
  params.forEach(async (article) => {
    await db(`INSERT INTO articles SET ?`, article);
  });
};

const getSampleFooterItems = async (user_id: T_user_id) => {
  const data: any = await db(
    `SELECT * FROM footer_items WHERE data_type = 'sample_data' ORDER BY created_at DESC`
  );

  const params = data.map((item: FooterItem) => {
    delete item.footer_item_id;
    delete item.created_at;
    delete item.updated_at;

    item.data_type = 'default_data';
    item.user_id = user_id;
    return item;
  });

  return params;
};

const insertSampleFooterItems = async (params: FooterItems) => {
  params.forEach(async (footerItem) => {
    await db(`INSERT INTO footer_items SET ?`, footerItem);
  });
};

const create_sample_data = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { user_id }: T_create_sample_data = req.body;

    try {
      const [params, itemParams] = await Promise.all([
        getSampleArticles(user_id),
        getSampleFooterItems(user_id),
      ]);

      await Promise.all([
        insertSampleArticles(params),
        insertSampleFooterItems(itemParams),
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/create_sample_dataのエラーは ' + JSON.stringify(err));
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

export default create_sample_data;
