import React from 'react';
import { GetServerSideProps } from 'next';
import { generateProps } from '../../util/db/generateProps';
import App from '../../app/container/App';
import Head from 'next/head';
import { TIndexProps } from '..';
import { checkIsGeneratePubulicPage } from '../../util/db/checkIsGeneratePubulicPage';
import { makeStyles, Typography, Theme, createStyles } from '@material-ui/core';
import { TUserInfo } from '../../app/store/Interface';
import { getDeviceType } from '../../util/getDeviceType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(3),
    },
  })
);

const PublicPage = (props: TIndexProps) => {
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

  let userInfo: TUserInfo | null = null;
  const slicedSlug = slug.replace('/public_page/', '');
  // サンプルページのiframeでで間違い半手せれてしまうため?以降のqueryとる
  const SlugArray = slicedSlug.split('?');
  try {
    // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
    userInfo = await checkIsGeneratePubulicPage(SlugArray[0]);

    if (userInfo === null) throw `userInfo is null`;
    const returnData: TIndexProps = {
      data: await generateProps(userInfo, true),
      isPublicPage: true,
      device: device,
      // sessionを入れてAppBarを表示させなくする
      session: { email: 'sample@sample.com', emailVerified: true },
    };

    return { props: returnData };
  } catch (err) {
    return { props: { isPublicPage: false } };
  }
};

export default PublicPage;
