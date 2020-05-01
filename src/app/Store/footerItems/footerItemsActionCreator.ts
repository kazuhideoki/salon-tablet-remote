import React from "react";
import { Store } from "../Store";
import { EditorContext } from "../EditorContext";

export const useGetFooterItems = () => {
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchFooterItems,
    dispatchAppState,
  } = React.useContext(Store);

  return async (page) => {
    const res = await fetch(`http://${location.host}/post_data/get/${page}`);

    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      dispatchFooterItems({
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

export const useCreateFooterItem = () => {
  const getPost = useGetPost();
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchFooterItems,
    dispatchAppState,
  } = React.useContext(Store);
  const { setFooterItemEditorText, setIconName } = React.useContext(EditorContext);
  return async (params) => {
    const res = await fetch(`http://${location.host}/post_data/create/post`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    });
    const data = await res.json();
    params.id = data.rawData.id;

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      setFooterItemEditorText("");
      setIconName("");
      dispatchAppState({ type: "CLOSE_MODAL" });
      getPost(1);
    }
  };
};

export const useGetFooterItem = () => {
  const {
    setIconName,
    setFooterItemEditorText,
    setIsEdittingFooterItem,
    setEdittingFooterItemParams,
  } = React.useContext(EditorContext);

  return async (params) => {
    const res = await fetch(
      `http://${location.host}/post_data/get/singlepost`,
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
      // const { title, content } = data.rawData;
      setIconName(title);
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(data.rawData);
      setFooterItemEditorText(content);
    }
  };
};

export const useUpdateFooterItem = () => {
  const { dispatchFooterItems, dispatchAppState } = React.useContext(Store);
  const { setTitleText, setEditorText, setIsEdittingPost } = React.useContext(
    EditorContext
  );
  return async (params, setIsEdit) => {
    const res = await fetch(`http://${location.host}/post_data/update/post`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    });
    const data = await res.json();

    if (data.err === true) {
      alert("更新できませんでした");
    } else {
      dispatchFooterItems({ type: "UPDATE_FOOTER_ITEM", payload: params });
      setIsEdit(false);
      setIsEdittingPost(false);
      setTitleText("");
      setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
};
export const useDeleteFooterItem = () => {
  const getPost = useGetPost();
  const {
    paginationParams,
    dispatchPaginationParams,
    footerItems,
    dispatchFooterItems,
  } = React.useContext(Store);
  return async (id: number) => {
    const res = await fetch(`http://${location.host}/post_data/delete/post`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
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
