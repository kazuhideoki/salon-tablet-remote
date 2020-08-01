import React from "react";
import { TUserInfo, TArticles, PaginationParams, FooterItems, TTags, TInstagramAccounts } from "../app/Store/Store";
import { App } from "../app/View/App";
//@ts-ignore
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { db } from "./api/lib/db";
import { NextPageContext, GetServerSideProps } from "next";
//@ts-ignore
import { TopPage } from "../pageComponent/TopPage";
import { T_articles_get, apiArticlesGet } from "./api/articles/get";
import { localhost } from "../config";
import { ApiUserInfoGetFromEmail } from "./api/user_info/getUserInfoFromEmail";
import { apiFooterItemsGet } from "./api/footer_items/get";
import { apiTagsGet } from "./api/tags/get";
import { apiInstagramAccountsGet } from "./api/instagram_accounts/get";
import { AddAlert } from "@material-ui/icons";

export type IndexProps = {
  data: {
    articles: TArticles;
    pagination: PaginationParams;
    footerItems: FooterItems;
    tags: TTags;
    instagramAccounts: TInstagramAccounts
    session?: TUserInfo;
  };
  csrfToken?: any;
  providers?: any
  bcrypt_password?: string;
  message?: string
};

const Index = (props: IndexProps) => {

  if (!props.data.session) {

    return (
      <>
        <TopPage csrfToken={props.csrfToken} providers={props.providers}/>
      </>
    );

  }

  // React.useEffect(() => {
  //   if (props.message && process.browser) {
  //     alert(props.message)
  //   }    
  // },[])

  // テーマ、記事データ、appの状態管理を読み込む
  return (
    <>
      <App data={props.data} />
    </>
  );
};

export type TSessionOnj = {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
  expires: string | null;
};

export const getServerSideProps: GetServerSideProps =  async (context) => {  

  const req = context.req;
  const sessionObj: TSessionOnj = await getSession({ req });
  console.log("index.tsxのsessionObjは " + JSON.stringify(sessionObj));
  let userInfo: TUserInfo;

  // ★★★セッションがある
  if (sessionObj !== null) {
    const userInfo = await ApiUserInfoGetFromEmail(sessionObj.user.email);

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        // console.log("indexのis_first_sign_inのとこだよ");
        
        const res = await fetch(`${localhost}/api/create_sample_data`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          mode: "cors",
          body: JSON.stringify(userInfo.user_id),
        });
      }

      // 記事一覧取得
      const articlesParam: T_articles_get = {
        page: 1,
        selectingTags: [],
        isSetting: true,
        userId: userInfo.user_id,
      };
      const data = await apiArticlesGet(articlesParam)      

      // アイテム一覧取得
      const data2 = await apiFooterItemsGet(userInfo.user_id)

      // タグ一覧取得
      const data3 = await apiTagsGet(userInfo.user_id)

      // Instagram連携アカウント一覧取得
      const data4 = await apiInstagramAccountsGet(userInfo.user_id)

      return {
        props: {
          data: {
            articles: data.err ? [] : data.rawData,
            pagination: data.err ? [] : data.pagination,
            footerItems: data2.err ? [] : data2,
            tags: data3.err ? [] : data3,
            instagramAccounts: data4.err ? [] : data4,
            // JSONのエラーになったので、このような書き方↓
            session: userInfo && JSON.parse(JSON.stringify(userInfo)),
          },
          // メッセージがあれば表示
          message: context.query || null,
        },
      };

    } // ★★★ユーザーデータがある

  } // ★★★セッションがある

  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  // ★★★セッションがない
  
  const token = await getCsrfToken();
  return {
    props: {
      data: {
        session: null,
      },
      csrfToken: token,
      providers: await providers(context),
      // instagram_access_denied: context.query.instagram_access_denied || false,
    },
  };
  
}

export default Index;
