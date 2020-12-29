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
import { useMainProps } from "../../View/tablet/Main/view/Main";

export type TUpdateArticle = TCreateArticle;

export const useUpdateArticle = () => {
  const {
    appState
  } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext)
  const { closeModal } = useModalProps();
  const { handleLoadingMain } = useMainProps();

  const getArticles = useGetArticles();
  
  return async (param: TUpdateArticle) => {

    closeModal()
    handleLoadingMain(true)
   
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
      handleLoadingMain(false)
    } else {
      closeModal()

      getArticles(appState.isSetting, paginationParams.page);
    }
  };
};
