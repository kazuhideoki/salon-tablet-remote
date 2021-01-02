import React from 'react';
import {
  TUserInfo,
  TArticles,
  TPaginationParams,
  FooterItems,
  TTags,
  TInstagramAccounts,
  TAllArticles,
  TInfoBarData,
  TUaDeviceType,
} from '../app/Store/Interface';
import { App } from '../app/View/App';
import { GetServerSideProps } from 'next';
import { TopPage } from '../pageComponent/TopPage';
import { getUserInfoFromEmail } from '../lib/getUserInfoFromEmail';
import { apiCreateSampleData } from './api/create_sample_data';
import { generateProps } from '../lib/generateProps';
import { apiCreatePublicPageSlug } from './api/user_info/create_public_page_slug';
import { SEO } from '../pageComponent/SEO';
import { getDeviceType } from '../lib/getDeviceType';
import { apiUserInfoCreate } from './api/user_info/create';
import { apiIsFirsSigninFalse } from './api/user_info/is_first_signin_false';
import { T_auth_get_session_return } from './api/auth/get_session';
import { getSession } from '../lib/auth/getSession';

export type TIndexPropsData = {
  articles: TArticles;
  pagination: TPaginationParams;
  allArticles: TAllArticles;
  footerItems: FooterItems;
  infoBarData: TInfoBarData;
  tags: TTags;
  instagramAccounts: TInstagramAccounts;
  userInfo: TUserInfo;
};

export type TIndexProps = {
  data: TIndexPropsData | null;
  isPublicPage: boolean;
  device: TUaDeviceType;
  session: T_auth_get_session_return | null;
};

const Index: React.FC<TIndexProps> = (props) => {
  if (props.session === null) {
    return (
      <>
        <SEO />
        <TopPage />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  const device = getDeviceType(context);

  // ★★★セッションがない
  if (session === null) {
    return {
      props: {
        data: null,
        session: null,
        isPublicPage: false,
        device: device,
      } as TIndexProps,
    };
  }

  // ★★★セッションがある
  let userInfo = await getUserInfoFromEmail(session.email);
  if (userInfo === null) {
    await apiUserInfoCreate({
      user_email: session.email,
    });
    userInfo = await getUserInfoFromEmail(session.email);
  }

  // ★★★最初のサインイン サンプルデータの追加
  if (userInfo && userInfo.is_first_sign_in) {
    // is_first_sign_inもfalseにされる
    try {
      await apiCreateSampleData({ user_id: userInfo.user_id });

      await apiCreatePublicPageSlug({
        user_id: userInfo.user_id,
        user_email: userInfo.user_email,
      });

      // 最後にis_first_sign_inのフラグをオフにする
      await apiIsFirsSigninFalse({ user_id: userInfo.user_id });

      // 更新したのでuserInfoを取り直す
      userInfo = await getUserInfoFromEmail(session.email);
    } catch (err) {
      console.log(err);
    }
  }

  const returnData: TIndexProps = {
    data: await generateProps(userInfo, false),
    isPublicPage: false,
    device: device,
    session,
  };

  return { props: returnData };
};

export default Index;
