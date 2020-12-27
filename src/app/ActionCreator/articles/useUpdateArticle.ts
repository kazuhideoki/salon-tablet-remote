import React from "react";
import { Store } from "../../Store/Store";
import { useGetArticles } from "./useGetArticles/useGetArticles";
import { TCreateArticle } from "./useCreateArticle";
import {
  T_articles_update,
  apiArticlesUpdate,
} from "../../../pages/api/articles/update";
import { ArticleContext } from "../../Store/articles/Context";

export type TUpdateArticle = TCreateArticle;

export const useUpdateArticle = () => {
  const {
    dispatchAppState,
    appState
  } = React.useContext(Store);
  const { paginationParams } = React.useContext(ArticleContext)

  const getArticles = useGetArticles();
  
  return async (param: TUpdateArticle) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
   
    const params: T_articles_update = {
      // dbに そのまま入れられるように paramsとwhereに使うidは分けておく
      params: {
        is_published: param.is_published,
        title: param.titleText,
        article_content: param.editorText,
        article_excerpt: param.editorTextExcerpt,
        article_img: param.editorImg,
        tag_ids: param.selectedTags.length
          ? JSON.stringify(param.selectedTags)
          : null,
        data_type: param.dataType,
      },
      article_id: appState.edittingPrams.article.article_id,
    };

    const data = await apiArticlesUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(appState.isSetting, paginationParams.page);
    }
  };
};
