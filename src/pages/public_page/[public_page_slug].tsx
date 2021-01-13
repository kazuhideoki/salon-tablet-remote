import React from 'react';
import { GetServerSideProps } from 'next';
import { generateProps } from '../../util/db/generateProps';
import App from '../../app/container/App';
import Head from 'next/head';
import { IndexProps } from '..';
import { checkIsGeneratePubulicPage } from '../../util/db/checkIsGeneratePubulicPage';
import { makeStyles, Typography, Theme, createStyles } from '@material-ui/core';
import { UserInfo } from '../../util/interface/Interface';
import { getDeviceType } from '../../util/getDeviceType';
import { SamplePage } from '../../app/stores/appState/initialValue';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(3),
    },
  })
);

const PublicPage = (props: IndexProps) => {
  const classes = useStyles();

  if (props.data && props.session) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
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
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Typography
          className={classes.typography}
          align="center"
          variant="h4"
          component="h2"
          gutterBottom
          color="textSecondary">
          パブリックページが有効化されていません
        </Typography>
      </>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const device = getDeviceType(req);

  const slug = req.url;
  if (slug === undefined) throw `slug is undefined`;

  let userInfo: UserInfo | null = null;
  const slicedSlug = slug.replace('/public_page/', '');
  // サンプルページのiframeでで間違い半手せれてしまうため?以降のqueryとる
  const SlugArray = slicedSlug.split('?');
  try {
    // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
    userInfo = await checkIsGeneratePubulicPage(SlugArray[0]);

    if (userInfo === null) throw `userInfo is null`;
    const returnData: IndexProps = {
      data: await generateProps(userInfo, true),
      isPublicPage: true,
      device: device,
      samplePage: query?.['sample'] as SamplePage | undefined,
      // sessionを入れてAppBarを表示させなくする
      session: { email: 'sample@sample.com', emailVerified: true },
    };

    return { props: returnData };
  } catch (err) {
    return { props: { isPublicPage: false } };
  }
};

export default PublicPage;
