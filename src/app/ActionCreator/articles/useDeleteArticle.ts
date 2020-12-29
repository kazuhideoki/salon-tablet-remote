import React from "react";
import {
  T_article_id,
} from "../../Store/Types";
import { useGetArticles } from "./useGetArticles/useGetArticles";
import { apiArticlesDelete } from "../../../pages/api/articles/delete";
import { ArticlesContext } from "../../Store/articles/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useMainProps } from "../../View/tablet/Main/view/Main";

export const useDeleteArticle = () => {
  const getArticles = useGetArticles();
  const { appState } = React.useContext(AppStateContext);
  const { paginationParams} = React.useContext(ArticlesContext)
  const { articles } = React.useContext(ArticlesContext)
  const { handleLoadingMain } = useMainProps();
  
  return async (article_id: T_article_id): Promise<void> => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null
    }
    
    handleLoadingMain(true)

    const data = await apiArticlesDelete({ article_id });

    if (data.err === true) {
      alert("削除できませんでした");
      handleLoadingMain(false)
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
