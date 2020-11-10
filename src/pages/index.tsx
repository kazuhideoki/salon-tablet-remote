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
// import { getCsrfToken, getSession, providers } from "next-auth/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import parser from "ua-parser-js";
import { TopPage } from "../pageComponent/TopPage";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { apiCreateSampleData } from "./api/create_sample_data";
import { generateProps } from "../lib/generateProps";
import { apiCreatePublicPageSlug } from "./api/user_info/create_public_page_slug";
import WebSiteDrawer from "../pageComponent/WebsiteDrawer";
import classes from "*.module.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { SEO } from "../pageComponent/SEO";
import dynamic from "next/dynamic";
// import FirebaseAuth  from "../pageComponent/FirebaseAuth";
import Link from "next/link";
// import { getSession } from "./api/auth/get_session";
const Auth = dynamic(() => import("../lib/Auth"), {
  ssr: false,
});

// import cookies from 'next-cookies'
import cookies from 'cookies'
import { useAuth } from "../lib/auth/AuthProvider";
import { getSession } from "../lib/auth/getSession";



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
  samplePage?: string
  csrfToken?: any;
  providers?: any;
  // bcrypt_password?: string;
  message?: string;
};

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      
   
    });
})

const Index = (props: IndexProps) => {
  const classes = useStyles()
  const {user, signout} = useAuth()

  if (props.data.userInfo) {
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
  
  const sessionObj = await getSession(context)



  const req = context.req;
  const ua = new parser.UAParser(req.headers["user-agent"]);

  // const sessionObj = {
  //     email: 'cutterkaz@gmail.com'
  // }
  // const result = await getSession()
  // const sessionObj = result.user

  console.log('sessionObjは ' + JSON.stringify(sessionObj))

  
  const device = ua.getDevice().type
  // console.log('ua.getDevice().typeは' + device);
  // console.log('uaのgetResultは ' + JSON.stringify(ua.getResult()));
  


  // ★★★セッションがある
  if (sessionObj !== null) {
    let userInfo = await getUserInfoFromEmail(sessionObj.email);

    // ★★★ユーザーデータがある
    if (userInfo) {

      // ★★★最初のサインイン サンプルデータの追加
      if (userInfo.is_first_sign_in) {
        // is_first_sign_inもfalseにされる
        await apiCreateSampleData({user_id: userInfo.user_id})
      }
      if (userInfo.public_page_slug === "") {
        console.log("public_page_slug === ''だから slug生成");

        await apiCreatePublicPageSlug({ user_id: userInfo.user_id, user_email: userInfo.user_email });
        // 更新したのでuserInfoを取り直す
        userInfo = await getUserInfoFromEmail(sessionObj.email);
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
    // data: null,
    isPublicPage: false,
    device: device || null,
    // csrfToken: await getCsrfToken(),
    // providers: await providers(context),
  };

  return { props: returnData }
  
}

export default Index;
