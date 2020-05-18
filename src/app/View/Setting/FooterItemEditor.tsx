import React from 'react'
import { IconSelect } from "./iconSelect/IconSelect";
import { QuillEditor } from "./QuillEditor";
import { SwitchOnTapModal } from "./SwitchOnTapModal";
import { EditorContext } from "../../Store/EditorContext";
import { useCreateFooterItem } from "../../ActionCreator/footerItems/useCreateFooterItem";
import { useUpdateFooterItem } from "../../ActionCreator/footerItems/useUpdateFooterItem";
import { TextField, Button, Typography } from '@material-ui/core';


export const FooterItemEditor = () => {
  const {
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    onTap,
    setOnTap,
    linkUrl,
    setLinkUrl,
    isEdittingFooterItem,
  } = React.useContext(EditorContext);
  const [charCountIconName, setCharCountIconName] = React.useState(0);
  const [charCountFooterItemContent, setCharCountFooterItemContent] = React.useState(0);
  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();

  const handleOnChangeIconName = (e) => {
    setIconName(e.target.value);
    setCharCountIconName(e.target.value.length);
  };


  const handleSubmit = ({ isPublishing }) => {
    if (isEdittingFooterItem) {
      updateFooterItem(isPublishing);
    } else {
      createFooterItem(isPublishing);
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
        onChange={(e) => handleOnChangeIconName(e)}
        style={{ marginBottom: "20px" }}
        autoFocus={isEdittingFooterItem ? false : true}
      />
      {charCountIconName < 101 ? null : (
        <Typography variant="body2" color={"error"}>
          文字数をオーバーしています(100文字以下)
        </Typography>
      )}
      <br />
      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />
      {onTap === "modal" ? (
        <QuillEditor
          value={footerItemEditorText}
          setValue={setFooterItemEditorText}
          charCount={charCountFooterItemContent}
          setCharCount={setCharCountFooterItemContent}
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
        disabled={
          charCountIconName < 101 && charCountFooterItemContent < 1001
            ? false
            : true
        }
      >
        {isEdittingFooterItem ? "更新" : "投稿"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleSubmit({ isPublishing: false })}
        disabled={
          charCountIconName < 101 && charCountFooterItemContent < 1001
            ? false
            : true
        }
      >
        下書き保存
      </Button>
    </>
  );
};

export default FooterItemEditor
