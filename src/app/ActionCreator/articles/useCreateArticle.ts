import React from "react";
import { useGetArticles } from "./useGetArticles/useGetArticles";
import { Store } from "../../Store/Store";
import { T_articles_create, apiArticlesCreate } from "../../../pages/api/articles/create";
import { T_data_type_article } from "../../Store/Types";
import { UserInfoContext } from "../../Store/userInfo/Context";

export type TCreateArticle = {
  is_published: boolean
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[];
  dataType: T_data_type_article
};
export const useCreateArticle =  () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState } = React.useContext(
    Store
  );
  const { userInfo } = React.useContext(UserInfoContext);
  
  return async ( param: TCreateArticle) => {

    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
    
    const params: T_articles_create = {
      is_published: param.is_published,
      title: param.titleText,
      article_content: param.editorText,
      article_excerpt: param.editorTextExcerpt,
      article_img: param.editorImg,
      tag_ids: param.selectedTags.length
      ? JSON.stringify(param.selectedTags)
      : null,
      data_type: param.dataType,
      user_id: userInfo.user_id,
    };

    const data = await apiArticlesCreate(params)

    if (data.err === true) {

      alert("投稿できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(appState.isSetting, 1, []);
    }
  };
};
