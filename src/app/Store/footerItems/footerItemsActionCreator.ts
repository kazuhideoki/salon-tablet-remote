import React from "react";
import { Store, FooterItem, FooterItemWithoutId } from "../Store";
import { EditorContext } from "../EditorContext";
import { IconsSetting } from "../../Setting/iconSelect/icons";
import { SwitchOrderParams } from "../../Setting/buttons/SwitchOrderButton";

export const useGetFooterItems = () => {
  const {
    dispatchFooterItems,
    dispatchAppState,
  } = React.useContext(Store);

  return async () => {
    const res = await fetch(`${location.protocol}//${location.host}/footer_items/get`);

    let data = await res.json();

    if (data.err === true) {
      alert("取得できませんでした");
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
    dispatchAppState,
    footerItems,
  } = React.useContext(Store);
  const {
    setFooterItemEditorText,
    setIconName,
    dispatchSelectedIcon,
  } = React.useContext(EditorContext);
  const getFooterItems = useGetFooterItems();

  let order
  // footerItemsの配列の中身を判定
  if (footerItems.length) {
    // orderの最大値を取得
    const orders = footerItems.map((value) => {
      return value.order
    })
    order = Math.max(...orders) + 1 // orderの最大値＋1を代入する
  } else {
    // 記事がないときは 1にする
    order = 1
  }

  return async (values: FooterItemWithoutId) => { 
    const {
      is_published,
      created_at,
      icon_name,
      displayed_icon,
      on_tap,
      item_content,
      link_url,
    } = values;

    const params: FooterItemWithoutId = {
      is_published: is_published,
      created_at: created_at,
      // "updated_at"は '' で入れられない→データベースの型datetimeに合わない
      updated_at: null,
      icon_name: icon_name,
      displayed_icon: displayed_icon,
      on_tap: on_tap,
      item_content: item_content,
      link_url: link_url,
      order: order // orderの最大値＋1を代入する
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/create/item`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("投稿できませんでした");
    } else {
      setFooterItemEditorText("");
      setIconName("");
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: null,
      });
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};

type UseGetFooterItemRes = {rawData: FooterItem, err: undefined} | {err: boolean, data: { message: string }, rawData: undefined}
export const useGetFooterItem = () => {
  const {
    setIconName,
    setFooterItemEditorText,
    setOnTap,
    setLinkUrl,
    setIsEdittingFooterItem,
    setEdittingFooterItemParams,
    dispatchSelectedIcon,
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
    const data:UseGetFooterItemRes  = await res.json();

    if (data.err === true) {
      alert("アイテムを取得できませんでした");
    } else {
      const {
        icon_name,
        item_content,
        displayed_icon,
        on_tap,
        link_url,
      } = data.rawData;
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(data.rawData);
      setIconName(icon_name);
      setFooterItemEditorText(item_content);
      setOnTap(on_tap);
      setLinkUrl(link_url)
      dispatchSelectedIcon({ type: "SET_ICON", payload: IconsSetting.convertIconComponentFromName(displayed_icon) });
    }
  };
};

export const useUpdateFooterItem = () => {
  const { dispatchFooterItems, dispatchAppState } = React.useContext(Store);
  const { setIconName, setFooterItemEditorText, setIsEdittingFooterItem } = React.useContext(
    EditorContext
  );

  return async (
    params: FooterItem,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/update/item`,
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
      dispatchFooterItems({ type: "UPDATE_FOOTER_ITEM", payload: params });
      setIsEdit(false);
      setIsEdittingFooterItem(false);
      setIconName("");
      setFooterItemEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
};

export const useDeleteFooterItem = () => {
  const {
    dispatchFooterItems,
  } = React.useContext(Store);

  return async (footer_item_id: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/delete/item`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        // jsonに変換するので数字でも{}で囲む
        body: JSON.stringify({footer_item_id}),
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

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();

  return async (params: SwitchOrderParams) => {
    console.log("useSwitchOrderのparamsは " + params);
    
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/switchOrder`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
    } else {
      getFooterItems();
    }
  };
};
