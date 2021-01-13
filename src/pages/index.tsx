import React from 'react';
import { UaDeviceType } from '../util/interface/Interface';
import { App } from '../app/container/App';
import { GetServerSideProps } from 'next';
import { TopPage } from '../app/components/pages/TopPage';
import { DataFromDB, generateProps } from '../util/db/generateProps';
import { SEO } from '../app/components/pages/SEO';
import { getDeviceType } from '../util/getDeviceType';
import { apiGetUserInfoFromEmail } from './api/user_info/get';
import { InitAppState } from '../app/stores/appState/initialValue';
import { apiGetSession, ApiGetSessionReturn } from '../util/db/apiGetSession';

export type IndexProps = {
  data?: DataFromDB;
  session?: ApiGetSessionReturn;
} & InitAppState;

const Index: React.FC<IndexProps> = (props) => {
  if (props.data && props.session) {
    return (
      <>
        <App {...props} data={props.data} session={props.session} />
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
  const device: UaDeviceType = getDeviceType(req);
  const topPageProps: IndexProps = {
    isPublicPage: false,
    device: device,
    samplePage: 'none',
  };

  try {
    const session = await apiGetSession({ req });

    if (session?.email) {
      const data = await apiGetUserInfoFromEmail(session.email);

      const props: IndexProps = {
        data: await generateProps(data.rawData, false),
        isPublicPage: false,
        device: device,
        samplePage: 'none',
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
