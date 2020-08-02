import React from "react";
import {
  T_article_id,
} from "../../Store/Types";
import { useGetArticles } from "./useGetArticles";
import { Store } from "../../Store/Store";

export const useDeleteArticle = () => {
  const getArticles = useGetArticles();
  const { paginationParams, articles } = React.useContext(Store);
  return async (article_id: T_article_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ article_id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      //   ページに表示されている記事が1で、かつ、最後の1記事ではない
      if (articles.length === 1 && paginationParams.rowCount > 1) {
        const targetPage = paginationParams.page - 1;
        getArticles(targetPage);
      } else {
        getArticles(paginationParams.page);
      }
    }
  };
};
