import React from "react";
import {
  Store,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_id,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useGetArticles } from "./useGetArticles";

type TUpdateArticle = {
  id: T_id;
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
};
export const useUpdateArticle = () => {
  const { dispatchAppState, paginationParams } = React.useContext(Store);
  const {
    setTitleText,
    setEditorText,
    setIsEdittingArticle,
    edittingArticleParams,
    titleText,
    editorText,
  } = React.useContext(EditorContext);
  const getArticles = useGetArticles();

  return async (isPublishing: boolean) => {
    const params: TUpdateArticle = {
      id: edittingArticleParams.id,
      is_published: isPublishing,
      title: titleText,
      article_content: editorText,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/articles/update`,
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
      setIsEdittingArticle(false);
      setTitleText("");
      setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getArticles(paginationParams.page);
    }
  };
};
