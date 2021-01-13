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
import { SamplePage } from '../app/stores/appState/initialValue';

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
  samplePage: SamplePage;
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
          samplePage={props.samplePage}
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  console.log('queryは ' + JSON.stringify(query));

  const device: UaDeviceType = getDeviceType(req);
  const topPageProps: IndexProps = {
    data: null,
    session: null,
    samplePage: 'none',
    isPublicPage: false,
    device: device,
  };

  try {
    const session = await apiGetSession({ req });

    if (session?.email) {
      const data = await apiGetUserInfoFromEmail(session.email);

      const props: IndexProps = {
        data: await generateProps(data.rawData, false),
        isPublicPage: false,
        samplePage: 'none',
        device: device,
        session,
      };

      return { props };
    } else {
      return { props: topPageProps };
    }
  } catch (err) {
    console.log(`index.tsx gSSP: ${err}`);
    return { props: topPageProps };
  }
};

export default Index;
