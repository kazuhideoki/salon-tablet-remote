import React from 'react'
import { SelectIcon } from "./iconSelect/SelectIcon";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../Editor/QuillEditor"), {
  ssr: false,
});
import { SwitchOnTapModal } from "./SwitchOnTapModal";
import { EditorContext } from "../../../Store/EditorContext";
import { useCreateFooterItem } from "../../../ActionCreator/footerItems/useCreateFooterItem";
import { useUpdateFooterItem } from "../../../ActionCreator/footerItems/useUpdateFooterItem";
import { TextField, Button, Typography, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { SelectAppLink } from './selectAppLink/SelectAppLink';
import { Store } from '../../../Store/Store';
import { CharCount } from '../../viewComponents/CharCount';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
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
  const { appState } = React.useContext(Store)
  const [charCountFooterItemContent, setCharCountFooterItemContent] = React.useState(0);
  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();

  const handleOnChangeIconName = (e) => {
    setTitleText(e.target.value);
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
      <Typography variant="h4" component="h2" className={classes.header}>
        {isEdittingContent ? "アイテム編集" : "アイテム作成"}
      </Typography>
      <TextField
        id="icon-name-text-field"
        label="アイテム名"
        value={titleText}
        onChange={(e) => handleOnChangeIconName(e)}
        className={classes.titleText}
        // style={{ marginBottom: "20px" }}
        autoFocus={isEdittingContent ? false : true}
      />
      <CharCount charCount={titleText.length} limitCount={100} />
      <br />

      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />
      {mainField}

      <SelectIcon />
      <Grid container className={classes.submitButtons}>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ isPublishing: true })}
            disabled={
              titleText.length < 101 && charCountFooterItemContent < 1001
                ? false
                : true
            }
          >
            {isEdittingContent ? "更新" : "投稿"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ isPublishing: false })}
            disabled={
              titleText.length < 101 && charCountFooterItemContent < 1001
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
