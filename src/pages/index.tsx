import React from 'react';
import {
  UserInfo,
  Articles,
  PaginationParams,
  FooterItems,
  Tags,
  InstagramAccounts,
  TAllArticles,
  InfoBarData,
  TUaDeviceType,
} from '../util/interface/Interface';
import { App } from '../app/container/App';
import { GetServerSideProps } from 'next';
import { TopPage } from '../app/components/pages/TopPage';
import { generateProps } from '../util/db/generateProps';
import { SEO } from '../app/components/pages/SEO';
import { getDeviceType } from '../util/getDeviceType';
import {
  apiGetSession,
  T_auth_get_session_return,
} from './api/auth/get_session';
import { apiGetUserInfoFromEmail } from './api/user_info/get';

export type TIndexPropsData = {
  articles: Articles;
  pagination: PaginationParams;
  allArticles: TAllArticles;
  footerItems: FooterItems;
  infoBarData: InfoBarData;
  tags: Tags;
  instagramAccounts: InstagramAccounts;
  userInfo: UserInfo;
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const device = getDeviceType(req);

  const topPageProps = {
    props: {
      data: null,
      session: null,
      isPublicPage: false,
      device: device,
    } as TIndexProps,
  };

  try {
    const session = await apiGetSession({ req });

    if (session?.email) {
      const data = await apiGetUserInfoFromEmail(session.email);

      return {
        props: {
          data: await generateProps(data.rawData, false),
          isPublicPage: false,
          device: device,
          session,
        } as TIndexProps,
      };
    } else {
      return topPageProps;
    }
  } catch (err) {
    console.log(`index.tsx gSSP: ${err}`);
    return topPageProps;
  }
};

export default Index;
