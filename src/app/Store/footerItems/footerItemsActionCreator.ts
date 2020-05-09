import React from "react";
import { Store } from "../Store";
import { EditorContext } from "../EditorContext";
import { IconsSetting } from "../../Setting/iconSelect/icons";

export const useGetFooterItems = () => {
  const {
    dispatchFooterItems,
    dispatchAppState,
  } = React.useContext(Store);

  return async (page) => {
    const res = await fetch(`${location.protocol}//${location.host}/footer_items/get`);

    let data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      

      dispatchFooterItems({
        type: "GET",
        payload: data.rawData,
      });
      dispatchAppState({ type: "END_LOADING" });
    }
  };
};

export const useCreateFooterItem = () => {
  const {
    dispatchFooterItems,
    dispatchAppState,
  } = React.useContext(Store);
  const { setFooterItemEditorText, setIconName } = React.useContext(EditorContext);
  return async (values ) => {
    const { is_published, created_at, updated_at, icon_name, displayed_icon, on_tap_modal_open, item_content, link_url, order } = values

    console.log(displayed_icon); 
    console.log(JSON.stringify(displayed_icon));
    

    const params = {
      is_published: is_published,
      created_at: created_at,
      // "updated_at"は '' で入れられない→datetimeに合わない
      icon_name: icon_name,
      // displayed_icon: JSON.stringify(displayed_icon),
      displayed_icon: displayed_icon,
      on_tap_modal_open: on_tap_modal_open,
      item_content: item_content,
      link_url: link_url,
      order: order,
    };

    const res = await fetch(`${location.protocol}//${location.host}/footer_items/create/item`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    });
    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      setFooterItemEditorText("");
      setIconName("");
      dispatchAppState({ type: "CLOSE_MODAL" });
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
      `${location.protocol}//${location.host}/footer_items/get/single`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ footer_item_id: params.footer_item_id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("記事を取得できませんでした");
    } else {
      const { title, content } = data.rawData;
      setIconName(title);
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(data.rawData);
      setFooterItemEditorText(content);
    }
  };
};

export const useUpdateFooterItem = () => {
  const { dispatchFooterItems, dispatchAppState } = React.useContext(Store);
  const { setTitleText, setEditorText, setIsEdittingArticle } = React.useContext(
    EditorContext
  );
  return async (params, setIsEdit) => {
    const res = await fetch(`${location.protocol}//${location.host}/footer_items/update/item`, {
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
      setIsEdittingArticle(false);
      setTitleText("");
      setEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
};

export const useDeleteFooterItem = () => {
  const {
    footerItems,
    dispatchFooterItems,
  } = React.useContext(Store);
  return async (footer_item_id: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/delete/item`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ footer_item_id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      dispatchFooterItems({
        type: "DELETE_FOOTER_ITEM",
        payload: footer_item_id,
      });
    }
  };
};
