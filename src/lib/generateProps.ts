import {
  TUserInfo,
} from "../app/Store/Types";
import { T_articles_get, apiArticlesGet } from "../pages/api/articles/get";
import { apiFooterItemsGet } from "../pages/api/footer_items/get";
import { apiTagsGet } from "../pages/api/tags/get";
import { apiInstagramAccountsGet } from "../pages/api/instagram_accounts/get";
import { apiInfoBarGet } from "../pages/api/info_bar/get";
import { IndexPropsData } from "../pages";

export const generateProps = async (userInfo: TUserInfo) => {
  // 記事一覧取得
      const articlesParam: T_articles_get = {
        page: 1,
        selectingTags: [],
        isSetting: true,
        userId: userInfo.user_id,
      };
      
      // 並列処理でデータを取ってくる
      const [data, data2, data3, data4, data5] = await Promise.all([
        apiArticlesGet(articlesParam),        
        apiFooterItemsGet(userInfo.user_id),
        apiInfoBarGet(userInfo.user_id),
        apiTagsGet(userInfo.user_id),
        apiInstagramAccountsGet(userInfo.user_id),
      ]);

      // as any で何故かエラー消える
      const propsData: IndexPropsData = {
        articles: data.err ? [] : data.rawData,
        pagination: data.err ? [] as any : data.pagination ,
        allArticles: data.err ? [] : data.allArticles,
        footerItems: data2.err ? [] : data2,
        infoBarData: data3.err ? [] as any : data3,
        tags: data4.err ? [] : data4,
        instagramAccounts: data5.err ? [] : data5,
        // JSONのエラーになったので、このような書き方↓
        userInfo: userInfo && JSON.parse(JSON.stringify(userInfo)),
      };

      return propsData
}