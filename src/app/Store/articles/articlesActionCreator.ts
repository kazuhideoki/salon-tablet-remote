import React from 'react'
import {
  Store,
  TArticle,
  T_is_published_articles,
  T_title,
  T_article_content,
  T_id,
} from "../Store";
import { EditorContext } from '../EditorContext';


export const useGetArticle = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchArticles,
    dispatchAppState,
    appState
  } = React.useContext(Store);
  const isSetting = appState.isSetting

  return async (page: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/get`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ page, isSetting: isSetting }),
      }
    );

    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      dispatchArticles({
        type: "GET",
        payload: data.rawData,
      });
      dispatchAppState({ type: "END_LOADING" });
    //   paginationが変わったらセットし直す
      if (paginationParams !== data.pagination) {
        dispatchPaginationParams({
          type: "SET_PAGINATION_PARAMS",
          payload: data.pagination,
        });
      }
    }
  };
};

export type TCreateArticle = {
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
};
export const useCreateArticle = () => {
  const getArticle = useGetArticle();
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchArticles,
    dispatchAppState,
  } = React.useContext(Store);
  const { setEditorText, setTitleText } = React.useContext(EditorContext);
  return async (params: TCreateArticle) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/create`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();
    // params.id = data.rawData.id;

    if (data.err === true) {
      console.log(data);

      alert("投稿できませんでした");
    } else {
      // dispatchArticles({
      //   type: "CREATE_POST",
      //   payload: params,
      // });
      setEditorText("");
      setTitleText("");
      dispatchAppState({ type: "CLOSE_MODAL" });
      // if (paginationParams !== data.pagination) {
      //   dispatchPaginationParams({
      //     type: "SET_PAGINATION_PARAMS",
      //     payload: data.pagination,
      //   });
      // }
      getArticle(1);
    }
  };
};

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

export type TUpdateArticle = {
  id: T_id;
  is_published: T_is_published_articles;
  title: T_title;
  article_content: T_article_content;
};
export const useUpdateArticle = () => {
  const { dispatchArticles, dispatchAppState, paginationParams } = React.useContext(Store);
  const { setTitleText, setEditorText, setIsEdittingArticle } = React.useContext(
    EditorContext
  );
    const getArticle = useGetArticle()

  return async (params: TUpdateArticle) => {
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

      getArticle(paginationParams.page);
    }
  };
};

export const useDeleteArticle = () => {
  const getArticle = useGetArticle();
  const {
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
  } = React.useContext(Store);
  return async (id: T_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      // dispatchArticles({ type: "DELETE_POST", payload: { id } });
      // if (paginationParams !== data.pagination) {
      //   dispatchPaginationParams({
      //     type: "SET_PAGINATION_PARAMS",
      //     payload: data.pagination,
      //   });
      // }
      //   ページに表示されている記事が1で、かつ、最後の1記事ではない
      if (articles.length === 1 && paginationParams.rowCount > 1) {
        const targetPage = paginationParams.page - 1;
        getArticle(targetPage);
      } else {
        getArticle(paginationParams.page);
      }
    }
  };
};
