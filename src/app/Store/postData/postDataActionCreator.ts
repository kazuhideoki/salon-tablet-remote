import React from 'react'
import { Store } from '../Store'
import { EditorContext } from '../EditorContext';

export const useGetPost = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchPostData,
    dispatchAppState,
  } = React.useContext(Store);

  return async (page) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/post_data/get/${page}`
    );

    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      dispatchPostData({
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
    dispatchPostData,
    dispatchAppState,
  } = React.useContext(Store);
  const { setEditorText, setTitleText } = React.useContext(EditorContext);
  return async (params) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/post_data/create/post`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();
    params.id = data.rawData.id;

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      // dispatchPostData({
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
    setIsEdittingPost,
    setEdittingPostParams,
  } = React.useContext(EditorContext);

  return async (params) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/post_data/get/singlepost`,
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
      const { title, content } = data.rawData;
      setTitleText(title);
      setIsEdittingPost(true);
      setEdittingPostParams(data.rawData);
      setEditorText(content);
    }
  };
};

export const useUpdatePost = () => {
  const { dispatchPostData, dispatchAppState } = React.useContext(Store);
  const { setTitleText, setEditorText, setIsEdittingPost } = React.useContext(
    EditorContext
  );
  return async (params, setIsEdit) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/post_data/update/post`,
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
      dispatchPostData({ type: "UPDATE_POST", payload: params });
      setIsEdit(false);
      setIsEdittingPost(false);
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
    postData,
    dispatchPostData,
  } = React.useContext(Store);
  return async (id: number) => {

    const res = await fetch(
      `${location.protocol}//${location.host}/post_data/delete/post`,
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
      // dispatchPostData({ type: "DELETE_POST", payload: { id } });
      // if (paginationParams !== data.pagination) {
      //   dispatchPaginationParams({
      //     type: "SET_PAGINATION_PARAMS",
      //     payload: data.pagination,
      //   });
      // }
    //   ページに表示されている記事が1で、かつ、最後の1記事ではない
      if (postData.length === 1 && paginationParams.rowCount > 1) {
          const targetPage = paginationParams.page - 1;
        getPost(targetPage);
      } else {
        getPost(paginationParams.page);
      }
    }
  };
};
