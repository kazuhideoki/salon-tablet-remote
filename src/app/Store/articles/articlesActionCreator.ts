import React from 'react'
import { Store, TArticle, ArticleWithoutId } from '../Store'
import { EditorContext } from '../EditorContext';


export const useGetPost = () => {
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

export const useCreatePost = () => {
  const getPost = useGetPost();
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchArticles,
    dispatchAppState,
  } = React.useContext(Store);
  const { setEditorText, setTitleText } = React.useContext(EditorContext);
  return async (params: ArticleWithoutId) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/create/post`,
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
      getPost(1);
    }
  };
};

export const useGetSinglePost = () => {
  const {
    setTitleText,
    setEditorText,
    setIsEdittingArticle,
    setEdittingArticleParams,
  } = React.useContext(EditorContext);

  return async (params) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/get/singlepost`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id: params.id }),
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

export const useUpdatePost = () => {
  const { dispatchArticles, dispatchAppState } = React.useContext(Store);
  const { setTitleText, setEditorText, setIsEdittingArticle } = React.useContext(
    EditorContext
  );
  return async (params, setIsEdit) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/update/post`,
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
      dispatchArticles({ type: "UPDATE_POST", payload: params });
      setIsEdit(false);
      setIsEdittingArticle(false);
      setTitleText("");
      setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

    }
  };
};


export const useDeletePost = () => {
  const getPost = useGetPost();
  const {
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
  } = React.useContext(Store);
  return async (id: number) => {

    const res = await fetch(
      `${location.protocol}//${location.host}/articles/delete/post`,
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
        getPost(targetPage);
      } else {
        getPost(paginationParams.page);
      }
    }
  };
};
