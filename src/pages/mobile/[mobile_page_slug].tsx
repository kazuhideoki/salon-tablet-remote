import React from 'react'
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next";
import { db } from '../api/lib/db';
import { apiCheckIsShowMobilePage, T_check_is_show_mobile_page_return } from '../api/user_info/check_is_show_mobile_page';


const MobilePageSlug = (props: T_check_is_show_mobile_page_return) => {
  // const router = useRouter();
  // const { pid } = router.query;

return <><p>slugは {props.mobile_page_slug}</p><p>is_show_mobile_pageは {props.is_show_mobile_page}</p></>
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const slug = req.url
  console.log(slug);
  
  const slicedSlug = slug.replace('/mobile/', '')
  console.log(slicedSlug);
  
  // slugがDBにあるかどうかチェックして、「表示させているか？」「slug」を返す
  const data = await apiCheckIsShowMobilePage(slicedSlug);

  // const correctUrls = ["correct_url" , 'a' , 'b']; // DB空撮ってきた mobile_page_url[]をつかうf

  // if (correctUrls.includes(slicedSlug)) {
  //   return { props: { slug: slug } };
  // }
  if (data.is_show_mobile_page) {
    return {props: data}
  }

  res.statusCode = 302;
  res.setHeader("Location", `/mobile/wrong_url?wrong_slug=${slicedSlug}`); // Replace <link> with your url link
  // return { props: { slug: slug } }; 
  res.end()
  return { props: data };

}

export default MobilePageSlug;