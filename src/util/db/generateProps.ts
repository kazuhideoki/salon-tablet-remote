import { TInfoBarData, TUserInfo } from '../../app/Store/Interface';
import { T_articles_get, apiArticlesGet } from '../../pages/api/articles/get';
import { apiFooterItemsGet } from '../../pages/api/footer_items/get';
import { apiTagsGet } from '../../pages/api/tags/get';
import { apiInstagramAccountsGet } from '../../pages/api/instagram_accounts/get';
import { apiInfoBarGet } from '../../pages/api/info_bar/get';
import { TIndexPropsData } from '../../pages';

export const generateProps = async (
  userInfo: TUserInfo,
  getPublishedOnly: boolean
): Promise<TIndexPropsData> => {
  const { user_id } = userInfo;
  // 記事一覧取得
  const articlesParam: T_articles_get = {
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
    const propsData: TIndexPropsData = {
      articles: data.err ? [] : data.rawData.articles,
      pagination: data.err ? ([] as any) : data.rawData.pagination,
      allArticles: data.err ? [] : data.rawData.allArticles,
      footerItems: data2.err ? [] : data2.rawData,
      infoBarData: data3.err ? ({} as TInfoBarData) : data3.rawData,
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
