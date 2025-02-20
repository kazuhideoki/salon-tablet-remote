import {
  UserInfo,
  PaginationParams,
  Article,
  FooterItems,
  Tags,
  InstagramAccounts,
  AllArticles,
  InfoBarData,
} from '../../util/interface/Interface';
import { ApiArticlesGet, apiArticlesGet } from '../../pages/api/articles/get';
import { apiFooterItemsGet } from '../../pages/api/footer_items/get';
import { apiTagsGet } from '../../pages/api/tags/get';
import { apiInstagramAccountsGet } from '../../pages/api/instagram_accounts/get';
import { apiInfoBarGet } from '../../pages/api/info_bar/get';

export type DataFromDB = {
  articles: Article[];
  pagination: PaginationParams;
  allArticles: AllArticles;
  footerItems: FooterItems;
  infoBarData: InfoBarData;
  tags: Tags;
  instagramAccounts: InstagramAccounts;
  userInfo: UserInfo;
};

export const generateProps = async (
  userInfo: UserInfo,
  getPublishedOnly: boolean
): Promise<DataFromDB> => {
  const { user_id } = userInfo;
  // 記事一覧取得
  const articlesParam: ApiArticlesGet = {
    page: 1,
    selectingTags: [],
    isSetting: getPublishedOnly ? false : true,
    userId: user_id,
  };

  try {
    const [data, data2, data3, data4, data5] = await Promise.all([
      apiArticlesGet(articlesParam),
      apiFooterItemsGet(user_id),
      apiInfoBarGet(user_id),
      apiTagsGet(user_id),
      apiInstagramAccountsGet(user_id),
    ]);

    // as any で何故かエラー消える
    const propsData: DataFromDB = {
      articles: data.err ? [] : data.rawData.articles,
      pagination: data.err ? ({} as PaginationParams) : data.rawData.pagination,
      allArticles: data.err ? [] : data.rawData.allArticles,
      footerItems: data2.err ? [] : data2.rawData,
      infoBarData: data3.err ? ({} as InfoBarData) : data3.rawData,
      tags: data4.err ? [] : data4.rawData,
      instagramAccounts: data5.err ? [] : data5.rawData,
      // JSONのエラーになったので、このような書き方↓
      userInfo: userInfo && JSON.parse(JSON.stringify(userInfo)),
    };

    return propsData;
  } catch (err) {
    throw `generateProps: ${err}`;
  }
};
