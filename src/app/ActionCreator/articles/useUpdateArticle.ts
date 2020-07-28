import React from "react";
import {
  Store,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_article_id,
  T_article_excerpt,
  T_article_img,
  T_tag_ids,
  TArticle,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetArticles } from "./useGetArticles";
import { TCreateArticle } from "./useCreateArticle";

export type T_articles_update = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string | null;
};
export type TUpdateArticle = {
  params: T_articles_update;
  article_id: T_article_id;
};
export const useUpdateArticle = () => {
  const {
    dispatchAppState,
    paginationParams,
    dispatchLoading,
    appState
  } = React.useContext(Store);

  const getArticles = useGetArticles();
  
  return async (
    isPublishing: boolean,
    param: TCreateArticle,
    // edittingArticleParams: TArticle,
  ) => {
    const tag_ids = param.selectedTags.length
      ? JSON.stringify(param.selectedTags)
      : null;
    const params: TUpdateArticle = {
      params: {
        is_published: isPublishing,
        title: param.titleText,
        article_content: param.editorText,
        article_excerpt: param.editorTextExcerpt,
        article_img: param.editorImg,
        tag_ids: tag_ids,
      },
      article_id: appState.edittingPrams.article.article_id,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/api/articles/update`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      // setIsEdittingContent(false);
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(paginationParams.page);
    }
  };
};
