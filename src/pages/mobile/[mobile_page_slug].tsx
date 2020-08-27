import React from 'react'
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next";


const MobilePageSlug = (props) => {
  // const router = useRouter();
  // const { pid } = router.query;

  return <p>urlは {props.slug}</p>;
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const slug = req.url
  console.log();
  
  const slicedSlug = slug.replace('/mobile/', '')

  const correctUrls = ["correct_url" , 'a' , 'b']; // DB空撮ってきた mobile_page_url[]をつかうf

  if (correctUrls.includes(slicedSlug)) {
    return { props: { slug: slug } };
  }

  res.statusCode = 302;
  res.setHeader("Location", `/mobile/wrong_url?wrong_slug=${slug}`); // Replace <link> with your url link
  // return { props: { slug: slug } }; 
  res.end()
  return { props: {} };

}

export default MobilePageSlug;