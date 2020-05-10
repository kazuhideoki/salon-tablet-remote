import React from 'react'
import { IconSelect } from "./iconSelect/IconSelect";
import ReactQuill from 'react-quill';
import { QuillEditor } from "./QuillEditor";
import { EditorContext } from '../Store/EditorContext';
import { FooterItemWithoutId, FooterItem } from "../Store/Store";
import { dateToSql } from '../modules/organizeSql/dateToSql';
import {
  useCreateFooterItem,
  useUpdateFooterItem,
} from "../Store/footerItems/footerItemsActionCreator";
import { Icon } from '@material-ui/core';
import { IconsSetting } from './iconSelect/icons';

export const FooterItemEditor = () => {
  const {
    selectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
  } = React.useContext(EditorContext);

  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();


  const handleSubmit = ({ isDraft }) => {
    let is_published: boolean;
    if (isDraft) {
      is_published = false;
    } else {
      is_published = true;
    }
    // const today = dateToSql(new Date());
    if (isEdittingFooterItem) {
      const params: FooterItem = {
        footer_item_id: edittingFooterItemParams.footer_item_id,
        is_published: is_published,
        created_at: dateToSql(edittingFooterItemParams.created_at),
        updated_at: dateToSql(new Date()),
        icon_name: iconName,
        displayed_icon: selectedIcon[1],
        on_tap_modal_open: true, // 今後機能つける
        item_content: footerItemEditorText,
        link_url: "", // 今後機能つける
        order: 1, // 今後機能つける
      };
      updateFooterItem(params, setIsEdittingFooterItem);
    } else {
      const params: FooterItemWithoutId = {
        // footer_item_id: 0,
        is_published: is_published,
        created_at: dateToSql(new Date()),
        updated_at: null,
        icon_name: iconName,
        // displayed_icon: IconsSetting.convertIconComponentToName(selectedIcon),
        displayed_icon: selectedIcon[1],
        on_tap_modal_open: true, // 今後機能つける
        item_content: footerItemEditorText,
        link_url: "", // 今後機能つける
        order: 1, // 今後機能つける
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
      <QuillEditor
        value={footerItemEditorText}
        setValue={setFooterItemEditorText}
      />
      <IconSelect />
      <button onClick={() => handleSubmit({ isDraft: false })}>
        {isEdittingFooterItem ? "更新" : "投稿"}
      </button>
      <button onClick={() => handleSubmit({ isDraft: true })}>
        下書き保存
      </button>
    </>
  );
};

export default FooterItemEditor
