import React from 'react'
import { GetServerSideProps } from "next";
import { generateProps } from '../../lib/generateProps';
import App from '../../app/View/App';
import Head from 'next/head';
import parser from "ua-parser-js";
import { IndexProps } from '..';
import { checkIsGeneratePubulicPage } from '../../lib/checkIsGeneratePubulicPage';



const PublicPage = (props: IndexProps) => {

  if (props.isPublicPage === false) {
    return (<>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <p>パブリックページが有効化されていません</p>
    </>)
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <App {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const slug = req.url
  
  const slicedSlug = slug.replace("/public_page/", "");
  // サンプルページのiframeでで間違い半手せれてしまうため?以降のqueryとる
  const SlugArray = slicedSlug.split('?')

  const ua = new parser.UAParser(req.headers["user-agent"]);
  const device = ua.getDevice().type;
  
  // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
  const userInfo = await checkIsGeneratePubulicPage(SlugArray[0]);

  if (userInfo === null) {
    // res.statusCode = 302;
    // res.setHeader(
    //   "Location",
    //   `/public_page/wrong_url?wrong_slug=${slicedSlug}`
    // ); 
    // res.end()
    return { props: {isPublicPage: false} };
  }

  const returnData: IndexProps = {
    data: await generateProps(userInfo, true),
    isPublicPage: true,
    samplePage: query.sample as string || null,
    device: device || null,
    // sessionを入れてAppBarを表示させなくする
    session: {email: 'sample@sample.com', emailVerified: true},
  }

  return { props: returnData }

}

export default PublicPage;