import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { tagIdsFromString } from '../../../lib/db/tagIdsFromString';
import {
  T_user_id,
  TArticles,
  TAllArticles,
  TPaginationParams,
} from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/db/apiWrap';
import { apiWrapPost } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiArticlesGet = async (
  params: T_articles_get
): Promise<TApiResponse<T_articles_get_return>> => {
  return apiWrapPost('articles/get', params);
};

export type T_articles_get = {
  page: number;
  selectingTags: number[];
  isSetting: boolean;
  userId: T_user_id;
};

export type T_articles_get_return = {
  rawData: TArticles;
  pagination: TPaginationParams;
  allArticles: TAllArticles;
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageSize = 6;
  if (req.method === 'POST') {
    const { page, selectingTags, isSetting, userId }: T_articles_get = req.body;
    // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
    const getPublishedOnly = isSetting ? ' ' : `AND is_published = true `;

    // 正規表現でタグを検索

    let getTagedPages;
    if (selectingTags.length === 0) {
      getTagedPages = '';
    } else {
      // mapで正規表現配列化
      const regExpTagsArray = selectingTags.map((value) => {
        return `'[[:<:]]${value}[[:>:]]'`;
      });
      // 正規表現連結、sql文化
      getTagedPages = `AND tag_ids REGEXP ${regExpTagsArray.join(
        ' AND tag_ids REGEXP '
      )} `;
    }

    // const skipRows = 5 * (page - 1); // オフセット, 何ページ飛ばすか
    const skipRows = pageSize * (page - 1); // オフセット, 何ページ飛ばすか
    const offSet = skipRows === 0 ? '' : skipRows + ',';

    const query =
      `SELECT * FROM articles WHERE user_id = ${userId} ` +
      getPublishedOnly +
      getTagedPages +
      `ORDER BY created_at DESC LIMIT ` +
      offSet +
      // ` 5`;
      ` ${pageSize}`;

    try {
      const data = (await db(query)) as TArticles;

      const query2 =
        `SELECT user_id FROM articles WHERE user_id = ${userId} ` +
        getPublishedOnly +
        getTagedPages;

      const data2: any = await db(query2);

      const query3 = `SELECT article_id, title FROM articles WHERE user_id = ${userId}`;
      const data3 = await db(query3);

      const pagination: TPaginationParams = {
        page: page,
        pageCount: data2.length ? Math.ceil(data2.length / pageSize) : 0, // 全row数をpageSizeで割って切り上げ
        pageSize: pageSize,
        rowCount: data2.length,
      };

      const returnData: TApiResponse<T_articles_get_return> = {
        err: false,
        rawData: {
          // tag_idsをnumber[]化する、なければnullのまま
          rawData: data.length ? tagIdsFromString(data) : data,
          pagination: pagination,
          allArticles: data3 as TAllArticles,
        },
      };

      return res.status(200).json(returnData);
    } catch (err) {
      console.log('/articles/get/のエラーは ' + JSON.stringify(err));

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

export default get;
