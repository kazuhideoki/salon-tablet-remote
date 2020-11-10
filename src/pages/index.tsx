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
import { GetServerSideProps } from "next";
import { TopPage } from "../pageComponent/TopPage";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { apiCreateSampleData } from "./api/create_sample_data";
import { generateProps } from "../lib/generateProps";
import { apiCreatePublicPageSlug } from "./api/user_info/create_public_page_slug";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { SEO } from "../pageComponent/SEO";
import { useAuth } from "../lib/auth/AuthProvider";
import { getSession, TSession } from "../lib/auth/getSession";
import { getDeviceType } from "../lib/getDeviceType";



export type IndexPropsData = {
  articles: TArticles;
  pagination: TPaginationParams;
  allArticles: TAllArticles;
  footerItems: FooterItems;
  infoBarData: TInfoBarData;
  tags: TTags;
  instagramAccounts: TInstagramAccounts;
  userInfo: TUserInfo;
}

export type IndexProps = {
  data?: IndexPropsData;
  isPublicPage: boolean
  device: string
  samplePage?: string
  csrfToken?: any;
  providers?: any;
  // bcrypt_password?: string;
  message?: string;
  session?: TSession 
};

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      
   
    });
})

const Index = (props: IndexProps) => {
  const classes = useStyles()
  const {user, signout} = useAuth()

  console.log('Index props.sessionは ' + props.session)

  if (props.session) {
    return (
      <>
        <App {...props} />
      </>
    );
  } else {
    return (
      <>
        <SEO/>
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
  const {req,res} = context
  
  const session = await getSession({req, res})
  console.log('index gSSR,sessionは ' + JSON.stringify(session))

  const device = getDeviceType(context)

  // ★★★セッションがない
  if (session === null) {
    return { 
      props: {
        session: null,
        isPublicPage: false,
        device: device || null,
      } as IndexProps
    }
  }

  
  // ★★★セッションがある
  let userInfo = await getUserInfoFromEmail(session.email);
  if (userInfo === null) {
    console.log('userInfoがない')
    throw 'No user information, please ask support.'}


  // ★★★最初のサインイン サンプルデータの追加
  if (userInfo.is_first_sign_in) {
    // is_first_sign_inもfalseにされる
    await apiCreateSampleData({user_id: userInfo.user_id})
  }
  if (userInfo.public_page_slug === "") {
    console.log("public_page_slug === ''だから slug生成");

    await apiCreatePublicPageSlug({ user_id: userInfo.user_id, user_email: userInfo.user_email });
    // 更新したのでuserInfoを取り直す
    userInfo = await getUserInfoFromEmail(session.email);
  }

  const returnData: IndexProps = {
    data: await generateProps(userInfo, false),
    isPublicPage: false,
    device: device || null,
    session
  };

  return { props: returnData }
  
}

export default Index;
