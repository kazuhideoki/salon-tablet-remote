import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next";

const MobileLinkWrong = (props) => {
  const router = useRouter();
  const { wrong_slug } = router.query;

  return (
    <>
      <p>間違ったurlは {wrong_slug}</p>

      <button>ぼたん</button>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const slug = req.querry.slug;
//   return { props: { slug: slug } };


// };

export default MobileLinkWrong;
