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
import { TextField, Button } from '@material-ui/core';


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
  const [charCount, setCharCount] = React.useState(0);

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
        displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
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
        displayed_icon_name: selectedIcon ? selectedIcon[1] : null,
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
      <h2>フッターアイテム</h2>
      <TextField
        id="icon-name-text-field"
        label="アイコン名"
        variant="outlined"
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
        autoFocus={isEdittingFooterItem ? false : true}
      />
      {/* <input
        value={iconName}
        onChange={(e) => setIconName(e.target.value)}
        style={{ marginBottom: "20px" }}
      /> */}
      <br />
      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />
      {onTap === "modal" ? (
        <QuillEditor
          value={footerItemEditorText}
          setValue={setFooterItemEditorText}
          charCount={charCount}
          setCharCount={setCharCount}
        />
      ) : (
        <TextField
          id="linkUrl"
          label="リンクURL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          variant="outlined"
        />
      )}
      <IconSelect />
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: true })}
        disabled={charCount < 1001 ? false : true}
      >
        {isEdittingFooterItem ? "更新" : "投稿"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: false })}
        disabled={charCount < 1001 ? false : true}
      >
        下書き保存
      </Button>
    </>
  );
};

export default FooterItemEditor
