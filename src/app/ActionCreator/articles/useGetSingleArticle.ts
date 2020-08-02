import React from "react";
import {
  T_article_id,
} from "../../Store/Types";
import { Store } from "../../Store/Store";

export const useGetSingleArticle = () => {
  const { articles } = React.useContext(Store)

  return async (article_id: T_article_id) => {
    const target = articles.filter((value) => {
      return value.article_id === article_id;
    });
    const article = target[0];

    if (!article) {
      alert("記事を取得できませんでした");
    } else {
      // setTitleText(article.title);
      // setIsEdittingContent(true);
      // setEdittingArticleParams(article);
      // setEditorText(article.article_content);
      // setEditorTextExcerpt(article.article_excerpt);
      // setEditorImg(article.article_img);
      // setSelectedTags(article.tag_ids)
      // setCreatedAt(article.created_at);
      // setUpdatedAt(article.updated_at);
    }
  };
};
