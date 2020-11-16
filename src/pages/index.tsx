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
import { getDeviceType } from "../lib/getDeviceType";
import { apiUserInfoCreate } from "./api/user_info/create";
import { apiIsFirsSigninFalse } from "./api/user_info/is_first_signin_false";
import { T_auth_get_session_return } from "./api/auth/get_session";
import { getSession } from "../lib/auth/getSession";



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
  message?: string;
  session?: T_auth_get_session_return 
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      
    });
})

const Index = (props: IndexProps) => {

  if (props.session === null) {
    return (
      <>
        <SEO/>
        <TopPage csrfToken={props.csrfToken} providers={props.providers} />
      </>
    );

  } else {
        return (
          <>
            <App {...props} />
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
  

  const session = await getSession({req})
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
    // throw 'No user information, please ask support.'}

    await apiUserInfoCreate({
      user_email: session.email,
    })

    userInfo = await getUserInfoFromEmail(session.email);
    console.log('getUserInfoFromEmail後のuserInfoは ' + JSON.stringify(userInfo))
  }

  // ★★★最初のサインイン サンプルデータの追加
  if (userInfo.is_first_sign_in) {
    // is_first_sign_inもfalseにされる
    try {

      await apiCreateSampleData({user_id: userInfo.user_id})

      await apiCreatePublicPageSlug({ user_id: userInfo.user_id, user_email: userInfo.user_email });
      
      // 最後にis_first_sign_inのフラグをオフにする
      await apiIsFirsSigninFalse({user_id: userInfo.user_id})

      // 更新したのでuserInfoを取り直す
      userInfo = await getUserInfoFromEmail(session.email); 

    } catch (err) {
      console.log(err);  
    }
  }

  // アカウント作成直後,確認メールでurlクリックしたが、session情報が更新されてない場合に対応
  // session.emailVerified = true

  const returnData: IndexProps = {
    data: await generateProps(userInfo, false),
    isPublicPage: false,
    device: device || null,
    session 
  };

  return { props: returnData }
  
}

export default Index;
