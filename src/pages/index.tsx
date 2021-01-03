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
import { generateProps } from '../lib/generateProps';
import { SEO } from '../pageComponent/SEO';
import { getDeviceType } from '../lib/getDeviceType';
import {
  apiGetSession,
  T_auth_get_session_return,
} from './api/auth/get_session';
import { apiGetUserInfoFromEmail } from './api/user_info/get';

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
  if (props.data && props.session) {
    return (
      <>
        <App
          data={props.data}
          isPublicPage={props.isPublicPage}
          device={props.device}
          session={props.session}
        />
      </>
    );
  } else {
    return (
      <>
        <SEO />
        <TopPage />
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const device = getDeviceType(context);

  try {
    const session = await apiGetSession({ req });

    if (session?.email) {
      const userInfo = await apiGetUserInfoFromEmail(session.email);

      return {
        props: {
          data: await generateProps(userInfo, false),
          isPublicPage: false,
          device: device,
          session,
        } as TIndexProps,
      };
    } else {
      return {
        props: {
          data: null,
          session: null,
          isPublicPage: false,
          device: device,
        } as TIndexProps,
      };
    }
  } catch (err) {
    console.log(`index.tsx gSSP: ${err}`);
  }
};

export default Index;
