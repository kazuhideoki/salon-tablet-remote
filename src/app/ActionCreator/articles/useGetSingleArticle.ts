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
    setEditorTextExcerpt,
    setEditorImg,
    setIsEdittingContent,
    setEdittingArticleParams,
  } = React.useContext(EditorContext);
  const { articles } = React.useContext(Store)

  return async (id: T_id) => {
    const target = articles.filter((value) => {
      return value.id === id
    })
    const article = target[0]

    if (!article) {
      alert("記事を取得できませんでした");
    } else {
      setTitleText(article.title);
      setIsEdittingContent(true);
      setEdittingArticleParams(article);
      setEditorText(article.article_content);
      setEditorTextExcerpt(article.article_excerpt)
      setEditorImg(article.article_img)
    }
  };
};
