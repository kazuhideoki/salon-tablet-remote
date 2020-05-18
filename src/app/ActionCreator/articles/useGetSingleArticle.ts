import React from "react";
import {
  Store,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_id,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";


export const useGetSingleArticle = () => {
  const {
    setTitleText,
    setEditorText,
    setIsEdittingArticle,
    setEdittingArticleParams,
  } = React.useContext(EditorContext);

  return async (id: T_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/get/singlepost`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("記事を取得できませんでした");
    } else {
      const { title, article_content } = data.rawData;
      setTitleText(title);
      setIsEdittingArticle(true);
      setEdittingArticleParams(data.rawData);
      setEditorText(article_content);
    }
  };
};
