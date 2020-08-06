import React from "react";
import {
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_id,
  T_article_excerpt,
  T_article_img,
  T_user_id,
  T_tag_ids,
} from "../../Store/Types";
import { useGetArticles } from "./useGetArticles";
import { Store } from "../../Store/Store";


export type T_articles_create = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null
  user_id: T_user_id;
};

export type TCreateArticle = {
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[]
};
export const useCreateArticle =   () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState } = React.useContext(
    Store
  );
  
  return async (isPublishing: boolean, param: TCreateArticle) => {
    const tag_ids = param.selectedTags.length
      ? JSON.stringify(param.selectedTags)
      : null;
    const params: T_articles_create = {
      is_published: isPublishing,
      title: param.titleText,
      article_content: param.editorText,
      article_excerpt: param.editorTextExcerpt,
      article_img: param.editorImg,
      tag_ids: tag_ids,
      user_id: appState.userInfo.user_id,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ params }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      console.log(data);

      alert("投稿できませんでした");
    } else {
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(appState.isSetting, 1, []);
    }
  };
};
