import React from "react";
import {
  Store,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_id,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetArticles } from "./useGetArticles";

export const useDeleteArticle = () => {
  const getArticles = useGetArticles();
  const { paginationParams, articles } = React.useContext(Store);
  return async (id: T_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id }),
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
