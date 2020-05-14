import React from 'react'
import { IconSelect } from "./iconSelect/IconSelect";
import { QuillEditor } from "./QuillEditor";
import { SwitchOnTapModal } from "./SwitchOnTapModal";
import { EditorContext } from '../Store/EditorContext';
import { FooterItemWithoutId, FooterItem, Store } from "../Store/Store";
import {
  useCreateFooterItem,
  useUpdateFooterItem,
  TCreateFooterItem,
  TUpdateFooterItem,
} from "../Store/footerItems/footerItemsActionCreator";
import { TextField } from '@material-ui/core';


export const FooterItemEditor = () => {
  const {
    selectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    onTap,
    setOnTap,
    linkUrl,
    setLinkUrl,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
    edittingFooterItemParams,
  } = React.useContext(EditorContext);
  const { footerItems } = React.useContext(Store)

  // const [onTap, setOnTap] = React.useState('modal'); // editorContextへ
  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();


  const handleSubmit = ({ isPublishing }) => {

    let on_tap: boolean;
    if (onTap === 'modal') {
      on_tap = true
    } else {
      on_tap = false
    }
    if (isEdittingFooterItem) {
      const params: TUpdateFooterItem = {
        footer_item_id: edittingFooterItemParams.footer_item_id,
        is_published: isPublishing,
        icon_name: iconName,
        // 選択されていたらアイコンの名前を返す
        displayed_icon: selectedIcon ? selectedIcon[1] : null,
        on_tap: onTap, // 要確認
        item_content: footerItemEditorText,
        link_url: linkUrl,
        order: edittingFooterItemParams.order,
      };
      updateFooterItem(params);
    } else {
      const params: TCreateFooterItem = {
        is_published: isPublishing,
        icon_name: iconName,
        // 選択されていたらアイコンの名前を返す.
        displayed_icon: selectedIcon ? selectedIcon[1] : null,
        on_tap: onTap,
        item_content: footerItemEditorText,
        link_url: linkUrl,
        order: 1,
      };
      createFooterItem(params);
    }
  };

  return (
    <>
      <h2>フッターの設定</h2>
      <h3>アイコンの名前</h3>
      <input
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <br/>
      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap}/>
      {onTap === 'modal' 
        ? <QuillEditor
          value={footerItemEditorText}
          setValue={setFooterItemEditorText}
      />
        : <TextField
          id="linkUrl"
          label="リンクURL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          variant="outlined"
        />
      }
      <IconSelect />
      <button onClick={() => handleSubmit({ isPublishing: true })}>
        {isEdittingFooterItem ? "更新" : "投稿"}
      </button>
      <button onClick={() => handleSubmit({ isPublishing: false })}>
        下書き保存
      </button>
    </>
  );
};

export default FooterItemEditor
