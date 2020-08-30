import React from "react";
import {
  TUserInfo,
  TArticles,
  TPaginationParams,
  FooterItems,
  TTags,
  TInstagramAccounts,
  TInstagramMedias,
  TInfoBar,
  TAllArticles,
  TInfoBarData,
} from "../app/Store/Types";
import { App } from "../app/View/App";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { GetServerSideProps } from "next";
import { TopPage } from "../pageComponent/TopPage";
import { T_articles_get, apiArticlesGet } from "./api/articles/get";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { apiFooterItemsGet } from "./api/footer_items/get";
import { apiTagsGet } from "./api/tags/get";
import { apiInstagramAccountsGet } from "./api/instagram_accounts/get";
import { apiCreateSampleData } from "./api/create_sample_data";
import { apiInfoBarGet } from "./api/info_bar/get";
import { generateProps } from "../lib/generateProps";

export type IndexPropsData = {
  articles: TArticles;
  pagination: TPaginationParams;
  allArticles: TAllArticles;
  footerItems: FooterItems;
  infoBarData: TInfoBarData;
  tags: TTags;
  instagramAccounts: TInstagramAccounts;
  userInfo?: TUserInfo;
};

export type IndexProps = {
  data: IndexPropsData;
  csrfToken?: any;
  providers?: any;
  // bcrypt_password?: string;
  message?: string;
};

const Index = (props: IndexProps) => {

  if (!props.data.userInfo) {
    return (
      <>
        <TopPage csrfToken={props.csrfToken} providers={props.providers} />
      </>
    );
  }

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
    const userInfo = await getUserInfoFromEmail(sessionObj.user.email);

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        apiCreateSampleData({user_id: userInfo.user_id})
      }

      const propsData: IndexPropsData = await generateProps(userInfo)

      return {
        props: {
          data: propsData,
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
        userInfo: null,
      },
      csrfToken: token,
      providers: await providers(context),
      // instagram_access_denied: context.query.instagram_access_denied || false,
    },
  };
  
}

export default Index;
