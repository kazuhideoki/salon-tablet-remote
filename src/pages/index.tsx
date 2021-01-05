import React from 'react';
import {
  UserInfo,
  Articles,
  PaginationParams,
  FooterItems,
  Tags,
  InstagramAccounts,
  AllArticles,
  InfoBarData,
  UaDeviceType,
} from '../util/interface/Interface';
import { App } from '../app/container/App';
import { GetServerSideProps } from 'next';
import { TopPage } from '../app/components/pages/TopPage';
import { generateProps } from '../util/db/generateProps';
import { SEO } from '../app/components/pages/SEO';
import { getDeviceType } from '../util/getDeviceType';
import { apiGetSession, ApiGetSessionReturn } from './api/auth/get_session';
import { apiGetUserInfoFromEmail } from './api/user_info/get';

export type IndexPropsData = {
  articles: Articles;
  pagination: PaginationParams;
  allArticles: AllArticles;
  footerItems: FooterItems;
  infoBarData: InfoBarData;
  tags: Tags;
  instagramAccounts: InstagramAccounts;
  userInfo: UserInfo;
};

export type IndexProps = {
  data: IndexPropsData | null;
  isPublicPage: boolean;
  device: UaDeviceType;
  session: ApiGetSessionReturn | null;
};

const Index: React.FC<IndexProps> = (props) => {
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
    } as IndexProps,
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
        } as IndexProps,
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
