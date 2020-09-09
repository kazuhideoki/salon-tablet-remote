import React from 'react'
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next";
import { db } from '../../lib/db';
import { getUserInfoFromSlug } from "../../lib/getUserInfoFromSlug";
import { IndexPropsData, IndexProps } from '..';
import { generateProps } from '../../lib/generateProps';
import App from '../../app/View/App';
import Head from 'next/head';


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

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const slug = req.url
  console.log(slug);
  
  const slicedSlug = slug.replace("/public_page/", "");
  console.log(slicedSlug);
  
  // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
  const userInfo = await getUserInfoFromSlug(slicedSlug);

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
  }

  return { props: returnData }




}

export default PublicPage;