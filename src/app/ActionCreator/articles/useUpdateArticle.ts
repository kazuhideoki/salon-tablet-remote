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
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetArticles } from "./useGetArticles";

export type T_articles_update = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
  article_excerpt: T_article_excerpt;
  article_img: T_article_img;
  tag_ids: string;
};
export type TUpdateArticle = {
  params: T_articles_update;
  article_id: T_article_id;
};
export const useUpdateArticle = () => {
  const { dispatchAppState, paginationParams } = React.useContext(Store);
  const {
    setTitleText,
    setEditorText,
    setIsEdittingContent,
    edittingArticleParams,
    titleText,
    editorText,
    editorTextExcerpt,
    editorImg,
    selectedTags,
  } = React.useContext(EditorContext);
  const getArticles = useGetArticles();
  const tag_ids = selectedTags.length ? JSON.stringify(selectedTags) : null;

  return async (isPublishing: boolean) => {
    const params: TUpdateArticle = {
      params: {
        is_published: isPublishing,
        title: titleText,
        article_content: editorText,
        article_excerpt: editorTextExcerpt,
        article_img: editorImg,
        tag_ids: tag_ids,
      },
      article_id: edittingArticleParams.article_id,
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
      setIsEdittingContent(false);
      // setTitleText("");
      // setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(paginationParams.page);
    }
  };
};
