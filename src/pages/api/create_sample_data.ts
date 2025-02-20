import { db } from '../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { FooterItem, Article } from '../../util/interface/Interface';
import { ApiResponse } from '../../util/db/apiWrap';
import { apiWrapPost } from '../../util/db/apiWrap';
import { PartiallyPartial } from '../../util/interface/typescript';

export const apiCreateSampleData = async (
  params: ApiCreateSampleData
): Promise<ApiResponse<void>> => {
  return apiWrapPost('create_sample_data', params);
};

export type ApiCreateSampleData = {
  user_id: number;
};

type ArticlesForSample = PartiallyPartial<
  Article,
  'article_id' | 'created_at' | 'updated_at'
>;

const getSampleArticles = async (user_id: number) => {
  const data = (await db(
    `SELECT * FROM articles WHERE data_type = 'sample_data' ORDER BY created_at DESC`
  )) as ArticlesForSample[];
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

const insertSampleArticles = async (params: ArticlesForSample[]) => {
  params.forEach(async (article) => {
    await db(`INSERT INTO articles SET ?`, article);
  });
};

type FooterItemForSample = PartiallyPartial<
  FooterItem,
  'footer_item_id' | 'created_at' | 'updated_at'
>;

const getSampleFooterItems = async (user_id: number) => {
  const data = (await db(
    `SELECT * FROM footer_items WHERE data_type = 'sample_data' ORDER BY created_at DESC`
  )) as FooterItemForSample[];

  const params = data.map((item) => {
    delete item.footer_item_id;
    delete item.created_at;
    delete item.updated_at;

    item.data_type = 'default_data';
    item.user_id = user_id;
    return item;
  });

  return params;
};

const insertSampleFooterItems = async (params: FooterItemForSample[]) => {
  params.forEach(async (footerItem) => {
    await db(`INSERT INTO footer_items SET ?`, footerItem);
  });
};

const create_sample_data = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { user_id }: ApiCreateSampleData = req.body;

    try {
      const [params, itemParams] = await Promise.all([
        getSampleArticles(user_id),
        getSampleFooterItems(user_id),
      ]);

      await Promise.all([
        insertSampleArticles(params),
        insertSampleFooterItems(itemParams),
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/create_sample_dataのエラーは ' + JSON.stringify(err));
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

export default create_sample_data;
