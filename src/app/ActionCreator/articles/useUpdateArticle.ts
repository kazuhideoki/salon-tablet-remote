import React from "react";
import { Store } from "../../Store/Store";
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_id,
  T_article_excerpt,
  T_article_img,
} from "../../Store/Types";
import { useGetArticles } from "./useGetArticles";
import { TCreateArticle } from "./useCreateArticle";
import {
  T_articles_update,
  apiArticlesUpdate,
} from "../../../pages/api/articles/update";

export type TUpdateArticle = TCreateArticle;

export const useUpdateArticle = () => {
  const {
    dispatchAppState,
    appState
  } = React.useContext(Store);
  const { paginationParams } = appState

  const getArticles = useGetArticles();
  
  return async (param: TUpdateArticle) => {
   
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
      },
      article_id: appState.edittingPrams.article.article_id,
    };

    const data = await apiArticlesUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(appState.isSetting, paginationParams.page);
    }
  };
};
