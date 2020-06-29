import React from 'react'
import { SelectIcon } from "./iconSelect/SelectIcon";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../Setting/QuillEditor"), {
  ssr: false,
});
import { SwitchOnTapModal } from "./SwitchOnTapModal";
import { EditorContext } from "../../Store/EditorContext";
import { useCreateFooterItem } from "../../ActionCreator/footerItems/useCreateFooterItem";
import { useUpdateFooterItem } from "../../ActionCreator/footerItems/useUpdateFooterItem";
import { TextField, Button, Typography, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { SelectAppLink } from './selectAppLink/SelectAppLink';
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleText: {
      width: 350,
      marginBottom: 20,
      maxWidth: "100%",
    },
    submitButtons: {
      position: "sticky",
      bottom: 0,
      zIndex: 100,
      background: "white",
    },
  })
);

export const FooterItemEditor = () => {
  const classes = useStyles()
  const {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    onTap,
    setOnTap,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    isEdittingContent,
    createdAt,
    updatedAt,
  } = React.useContext(EditorContext);
  const [charCountIconName, setCharCountIconName] = React.useState(0);
  const [charCountFooterItemContent, setCharCountFooterItemContent] = React.useState(0);
  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();

  const handleOnChangeIconName = (e) => {
    setTitleText(e.target.value);
    setCharCountIconName(e.target.value.length);
  };


  const handleSubmit = ({ isPublishing }) => {
    if (isEdittingContent) {
      updateFooterItem(isPublishing);
    } else {
      createFooterItem(isPublishing);
    }
  };

  let mainField: JSX.Element
  if (onTap === "modal") {
    mainField = (
      <QuillEditor
        editorText={editorText}
        setEditorText={setEditorText}
        setEditorTextExcerpt={setEditorTextExcerpt}
        charCount={charCountFooterItemContent}
        setCharCount={setCharCountFooterItemContent}
      />
    );
  } else if (onTap === "link"){
    mainField = (
      <div>
      <TextField
        id="linkUrl"
        label="リンクURL"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        variant="outlined"
      />
      </div>
    );
  } else if (onTap === "appLink") {
    mainField = (
      <div>
        <SelectAppLink appLinkUrl={appLinkUrl} setAppLinkUrl={setAppLinkUrl} />
      </div>
    ); }

  return (
    <>
      <h2>フッターアイテム</h2>
      <TextField
        id="icon-name-text-field"
        label="アイテム名"
        variant="outlined"
        value={titleText}
        onChange={(e) => handleOnChangeIconName(e)}
        className={classes.titleText}
        // style={{ marginBottom: "20px" }}
        autoFocus={isEdittingContent ? false : true}
      />
      {charCountIconName < 101 ? null : (
        <Typography variant="body2" color={"error"}>
          文字数をオーバーしています(100文字以下)
        </Typography>
      )}
      <br />

      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />
      {mainField}

      <SelectIcon />
      <Grid container className={classes.submitButtons}>
        {/* <Grid item>
          <SelectIcon />
        </Grid> */}
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => handleSubmit({ isPublishing: true })}
            disabled={
              charCountIconName < 101 && charCountFooterItemContent < 1001
                ? false
                : true
            }
          >
            {isEdittingContent ? "更新" : "投稿"}
          </Button>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </>
  );
};

export default FooterItemEditor
