import React from "react";
import {
  TUserInfo,
  TArticles,
  TPaginationParams,
  FooterItems,
  TTags,
  TInstagramAccounts,
  TAllArticles,
  TInfoBarData,
} from "../app/Store/Types";
import { App } from "../app/View/App";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { GetServerSideProps } from "next";
import parser from "ua-parser-js";
import { TopPage } from "../pageComponent/TopPage";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { apiCreateSampleData } from "./api/create_sample_data";
import { generateProps } from "../lib/generateProps";
import { apiCreatePublicPageSlug } from "./api/user_info/create_public_page_slug";
import WebSiteDrawer from "../pageComponent/WebsiteDrawer";

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
  data?: IndexPropsData;
  isPublicPage: boolean
  device: string
  csrfToken?: any;
  providers?: any;
  // bcrypt_password?: string;
  message?: string;
};

const Index = (props: IndexProps) => {

  if (props.data) {
    return (
      <>
        <App {...props} />
      </>
    );
  } else {
    return (
      <>
        <WebSiteDrawer/>
        <TopPage csrfToken={props.csrfToken} providers={props.providers} />
      </>
    );
  }

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
  // let userInfo: TUserInfo;

  const ua = new parser.UAParser(req.headers["user-agent"]);
  const device = ua.getDevice().type
  console.log('ua.getDevice().typeは' + device);
  

  console.log('uaのgetResultは ' + JSON.stringify(ua.getResult()));
  


  // ★★★セッションがある
  if (sessionObj !== null) {
    let userInfo = await getUserInfoFromEmail(sessionObj.user.email);

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        await apiCreateSampleData({user_id: userInfo.user_id})
      }
      if (userInfo.public_page_slug === "") {
        console.log("public_page_slug === ''だから slug生成");

        await apiCreatePublicPageSlug({ user_id: userInfo.user_id, user_email: userInfo.user_email });
        // 更新したのでuserInfoを取り直す
        userInfo = await getUserInfoFromEmail(sessionObj.user.email);
      }

      const returnData: IndexProps = {
        data: await generateProps(userInfo, false),
        isPublicPage: false,
        device: device || null,
      };

      return { props: returnData }

    } // ★★★ユーザーデータがある

  } // ★★★セッションがある

  // ※もしかしたら↓うまく行かないこともあるかもしれないが、スッキリさせた
  // ★★★セッションがない

  const returnData: IndexProps = {
    data: null,
    isPublicPage: false,
    device: device || null,
    csrfToken: await getCsrfToken(),
    providers: await providers(context),
  };

  return { props: returnData }
  
}

export default Index;
