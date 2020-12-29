import React from "react";
import { useGetArticles } from "./useGetArticles/useGetArticles";
import { TCreateArticle } from "./useCreateArticle";
import {
  T_articles_update,
  apiArticlesUpdate,
} from "../../../pages/api/articles/update";
import { ArticlesContext } from "../../Store/articles/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useModalProps } from "../../View/tablet/Modal/Modal/view/Modal";

export type TUpdateArticle = TCreateArticle;

export const useUpdateArticle = () => {
  const {
    dispatchAppState,
    appState
  } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext)
  const { closeModal } = useModalProps();

  const getArticles = useGetArticles();
  
  return async (param: TUpdateArticle) => {

    closeModal()
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
      closeModal()

      getArticles(appState.isSetting, paginationParams.page);
    }
  };
};
