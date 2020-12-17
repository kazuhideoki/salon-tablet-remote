import React from "react";
import {
  T_article_id,
} from "../../Store/Types";
import { useGetArticles } from "./useGetArticles";
import { Store } from "../../Store/Store";
import { apiArticlesDelete } from "../../../pages/api/articles/delete";

export const useDeleteArticle = () => {
  const getArticles = useGetArticles();
  const { appState ,dispatchAppState } = React.useContext(Store);
  const {articles, paginationParams} = appState
  
  return async (article_id: T_article_id): Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null
    }
    
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });

    const data = await apiArticlesDelete({ article_id });

    if (data.err === true) {
      alert("削除できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
    } else {
      //   ページに表示されている記事が1で、かつ、最後の1記事ではない
      if (articles.length === 1 && paginationParams.rowCount > 1) {
        const targetPage = paginationParams.page - 1;
        getArticles(appState.isSetting,targetPage);
      } else {
        getArticles(appState.isSetting, paginationParams.page);
      }
    }
  };
};
