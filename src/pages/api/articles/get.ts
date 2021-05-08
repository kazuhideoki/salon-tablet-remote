import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { tagIdsFromString } from '../../../util/db/tagIdsFromString';
import {
  Article,
  AllArticles,
  ArticleFromDB,
  PaginationParams,
} from '../../../util/interface/Interface';
import { apiWrapGet, ApiResponse } from '../../../util/db/apiWrap';

export const apiArticlesGet = async (
  params: ApiArticlesGet
): Promise<ApiResponse<ApiArticlesGetReturn>> => {
  const { page, selectingTags, isSetting, userId } = params;

  return apiWrapGet(
    `articles/get?page=${page}&selectingTags=${selectingTags}&isSetting=${isSetting}&userId=${userId}`
  );
};

export type ApiArticlesGet = {
  page: number;
  selectingTags: number[];
  isSetting: boolean;
  userId: number;
};

export type ApiArticlesGetReturn = {
  articles: Article[];
  pagination: PaginationParams;
  allArticles: AllArticles;
};

const pageSize = 6;

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const page = Number(req.query.page) as number;
  const selectingTags = req.query.selectingTags
    ? ((req.query.selectingTags as string)
        .split(',')
        .map((value) => Number(value)) as number[])
    : [];
  const isSetting: boolean = req.query.isSetting === 'true' ? true : false;
  const userId = Number(req.query.userId) as number;

  const ArticleGet: ApiArticlesGet = {
    page,
    selectingTags,
    isSetting,
    userId,
  }; // 型checkのため;

  // 通常はis_published(投稿済み)がtrueのみ,セッティング中はすべての記事
  const getPublishedOnly = isSetting ? '' : `AND is_published = true`;

  // mapで正規表現配列化
  const regExpTagsArray = selectingTags.map((value) => {
    return `'[[:<:]]${value}[[:>:]]'`;
  });

  // 正規表現連結、sql文化
  const getTagedPages =
    selectingTags.length === 0
      ? ''
      : `AND tag_ids REGEXP ${regExpTagsArray.join(' AND tag_ids REGEXP ')}`;

  const skipRows = pageSize * (page - 1); // オフセット, 何ページ飛ばすか
  const offSet = skipRows === 0 ? '' : skipRows + ',';

  try {
    const data = (await db(
      `SELECT * FROM articles WHERE user_id = ${userId} ${getPublishedOnly} ${getTagedPages} ORDER BY created_at DESC LIMIT ${offSet} ${pageSize}`
    )) as ArticleFromDB[];

    const data2 = (await db(
      `SELECT user_id FROM articles WHERE user_id = ${userId} ${getPublishedOnly} ${getTagedPages}`
    )) as { user_id: number }[];

    const data3 = await db(
      `SELECT article_id, title FROM articles WHERE user_id = ${userId}`
    );

    const pagination: PaginationParams = {
      page: page,
      pageCount: data2.length ? Math.ceil(data2.length / pageSize) : 0, // 全row数をpageSizeで割って切り上げ
      pageSize: pageSize,
      rowCount: data2.length,
    };

    const rawData: ApiArticlesGetReturn = {
      // tag_idsをnumber[]化する、なければnullのまま
      articles: (data.length ? tagIdsFromString(data) : data) as Article[],
      pagination: pagination,
      allArticles: data3 as AllArticles,
    };

    res
      .status(200)
      .json({ err: false, rawData } as ApiResponse<ApiArticlesGetReturn>);
  } catch (err) {
    console.log('/articles/get/のエラーは ' + JSON.stringify(err));

    return res.status(500).json({ err: true, rawData: err } as ApiResponse);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
