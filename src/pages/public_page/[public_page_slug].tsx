import React from 'react'
import { GetServerSideProps } from "next";
import { getUserInfoFromSlug } from "../../lib/getUserInfoFromSlug";
import { generateProps } from '../../lib/generateProps';
import App from '../../app/View/App';
import Head from 'next/head';
import parser from "ua-parser-js";
import { IndexProps } from '..';



const PublicPage = (props: IndexProps) => {

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
  // console.log(slug);
  
  const slicedSlug = slug.replace("/public_page/", "");
  console.log(slicedSlug);
  // サンプルページのiframでで間違い半手せれてしまうため?以降のqueryとる
  const SlugArray = slicedSlug.split('?')
  console.log(SlugArray);

  const ua = new parser.UAParser(req.headers["user-agent"]);
  const device = ua.getDevice().type;
  console.log(device);
  
  // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
  const userInfo = await getUserInfoFromSlug(SlugArray[0]);

  if (userInfo === null) {
    res.statusCode = 302;
    res.setHeader(
      "Location",
      `/public_page/wrong_url?wrong_slug=${slicedSlug}`
    ); 
    res.end()
    return { props: null };
  }

  const returnData: IndexProps = {
    data: await generateProps(userInfo, true),
    isPublicPage: true,
    samplePage: query.sample as string || null,
    device: device || null,
    // sessionを入れてAppBarを表示させなくする
    session: {email: 'sample@sample.com'},
  }

  return { props: returnData }

}

export default PublicPage;