import React from "react";
import { useGetArticles } from "./useGetArticles";
import { Store } from "../../Store/Store";
import { T_articles_create, apiArticlesCreate } from "../../../pages/api/articles/create";

export type TCreateArticle = {
  is_published: boolean
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[];
};
export const useCreateArticle =   () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState } = React.useContext(
    Store
  );
  
  return async ( param: TCreateArticle) => {
    
    const tag_ids = param.selectedTags.length
      ? JSON.stringify(param.selectedTags)
      : null;

    const params: T_articles_create = {
      is_published: param.is_published,
      title: param.titleText,
      article_content: param.editorText,
      article_excerpt: param.editorTextExcerpt,
      article_img: param.editorImg,
      tag_ids: tag_ids,
      user_id: appState.userInfo.user_id,
    };

    const data = await apiArticlesCreate(params)

    if (data.err === true) {
      console.log(data);

      alert("投稿できませんでした");
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(appState.isSetting, 1, []);
    }
  };
};
