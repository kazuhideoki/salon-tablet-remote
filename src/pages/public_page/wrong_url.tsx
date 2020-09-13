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
      <p>slugは {props.public_page_slug}</p>
      <p>is_generate_public_pageは {props.is_generate_public_page}</p>
    </>
  );
};

export default MobileLinkWrong;
