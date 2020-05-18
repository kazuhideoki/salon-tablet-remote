import React from "react";
import { Store, FooterItem, FooterItemWithoutId, T_is_published_footer_items, T_icon_name, T_displayed_icon_name, T_on_tap, T_item_content, T_link_url, T_order, T_footer_item_id } from "../Store";
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

type TCreateFooterItem = {
  is_published: T_is_published_footer_items,
  icon_name: T_icon_name,
  displayed_icon_name: T_displayed_icon_name | null,
  on_tap: T_on_tap,
  item_content: T_item_content,
  link_url: T_link_url,
  order: T_order,
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

  const {
    iconName,
    selectedIcon,
    onTap,
    footerItemEditorText,
    linkUrl,
  } = React.useContext(EditorContext);

  return async (isPublishing: boolean) => {
    const params: TCreateFooterItem = {
      is_published: isPublishing,
      icon_name: iconName,
      // 選択されていたらアイコンの名前を返す.
      displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
      on_tap: onTap,
      item_content: footerItemEditorText,
      link_url: linkUrl,
      order: 1,
    };

    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/create`,
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

  return async (footer_item_id: T_footer_item_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/get/single`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ footer_item_id: footer_item_id }),
      }
    );
    const data: UseGetFooterItemRes = await res.json();

    if (data.err === true) {
      alert("アイテムを取得できませんでした");
    } else {
      const {
        icon_name,
        item_content,
        displayed_icon_name,
        on_tap,
        link_url,
      } = data.rawData;
      setIsEdittingFooterItem(true);
      setEdittingFooterItemParams(data.rawData);
      setIconName(icon_name);
      setFooterItemEditorText(item_content);
      setOnTap(on_tap);
      setLinkUrl(link_url);
      dispatchSelectedIcon({
        type: "SET_ICON",
        payload: IconsSetting.convertIconComponentFromName(displayed_icon_name),
      });
    }
  };
};

type TUpdateFooterItem = {
  footer_item_id: T_footer_item_id
  is_published: T_is_published_footer_items,
  icon_name: T_icon_name,
  displayed_icon_name: T_displayed_icon_name | null,
  on_tap: T_on_tap,
  item_content: T_item_content,
  link_url: T_link_url,
  order: T_order,
};

export const useUpdateFooterItem = () => {
  const { dispatchAppState } = React.useContext(Store);
  const { setIconName, setFooterItemEditorText, setIsEdittingFooterItem } = React.useContext(
    EditorContext
  );
  const getFooterItems = useGetFooterItems()

  const {
    edittingFooterItemParams,
    iconName,
    selectedIcon,
    onTap,
    footerItemEditorText,
    linkUrl,
  } = React.useContext(EditorContext);

  return async (isPublishing: boolean) => {
    const params: TUpdateFooterItem = {
      footer_item_id: edittingFooterItemParams.footer_item_id,
      is_published: isPublishing,
      icon_name: iconName,
      // 選択されていたらアイコンの名前を返す
      displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
      on_tap: onTap, // 要確認
      item_content: footerItemEditorText,
      link_url: linkUrl,
      order: edittingFooterItemParams.order,
    };
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/update`,
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
      setIsEdittingFooterItem(false);
      setIconName("");
      setFooterItemEditorText("");
      dispatchAppState({ type: "CLOSE_MODAL" });

      getFooterItems();
    }
  };
};

export const useDeleteFooterItem = () => {
  const {
    dispatchFooterItems,
  } = React.useContext(Store);

  return async (footer_item_id: number) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/delete`,
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
