import React from 'react'
import { IconSelect } from "./iconSelect/IconSelect";
import ReactQuill from 'react-quill';
import { QuillEditor } from "./QuillEditor";
import { EditorContext } from '../Store/EditorContext';
import { FooterItemWithoutId } from "../Store/Store";
import { dateToSql } from '../modules/organizeSql/dateToSql';
import { useCreateFooterItem, useGetFooterItems } from "../Store/footerItems/footerItemsActionCreator";
import { Icon } from '@material-ui/core';
import { IconsSetting } from './iconSelect/icons';

export const FooterItemEditor = () => {
  const {
    selectedIcon,
    dispatchSelectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
  } = React.useContext(EditorContext);

  
  const createFooterItem = useCreateFooterItem();
  const getFooterItems = useGetFooterItems();


  const handleSubmit = () => {
    if (isEdittingFooterItem) {
      // const params: FooterItem = {
      //   footer_items_id: edittingFooterItemParams.footer_items_id,
      //   icon_name: iconName,
      //   // date: dateToSql(edittingFooterItemParams.date),
      //   item_content: footerItemEditorText,
      // };
      // updatePost(params, setIsEdittingFooterItem);

    } else {
      const today = new Date();
      const date = dateToSql(today);
      const params: FooterItemWithoutId = {
        // footer_items_id: 0,
        is_published: false,
        created_at: date,
        updated_at: null,
        icon_name: iconName,
        displayed_icon: IconsSetting.convertIconComponentToName(selectedIcon),
        on_tap_modal_open: true,
        item_content: footerItemEditorText,
        link_url: "",
        order: 1,
      };
      createFooterItem(params);

    }
  };

  return (
    <>
      <h2>フッターの設定</h2>
      <input
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <QuillEditor value={footerItemEditorText}
      setValue={setFooterItemEditorText}/>
      <IconSelect/>
      <button
      onClick={() => handleSubmit()}
      >
        完了
      </button>
    </>
  );
};

export default FooterItemEditor
