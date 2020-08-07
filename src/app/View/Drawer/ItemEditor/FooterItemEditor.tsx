import React from 'react'
import { SelectIcon } from "./iconSelect/SelectIcon";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("../Editor/QuillEditor"), {
  ssr: false,
});
import { SwitchOnTapModal } from "./SwitchOnTapModal";
import { useCreateFooterItem, TCreateFooterItem } from "../../../ActionCreator/footerItems/useCreateFooterItem";
import { useUpdateFooterItem } from "../../../ActionCreator/footerItems/useUpdateFooterItem";
import { TextField, Button, Typography, makeStyles, Theme, createStyles, Grid, useMediaQuery } from '@material-ui/core';
import { SelectAppLink } from './selectAppLink/SelectAppLink';
import { Store } from "../../../Store/Store";
import { FooterItem, T_modal_size } from '../../../Store/Types';
import { CharCounter } from "../../viewComponents/CharCounter";
import { SelectModalSize } from '../../Setting/SelectModalSize';
import { selectedIconReducer } from '../../../Reducer/selectedIconReducer';
import { IconsSetting } from './iconSelect/icons';
import { HelpButton } from '../../viewComponents/buttons/HelpButton';

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
    linkTextField: {
      minWidth: "80%",
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

export const FooterItemEditor: React.FC = () => {
  const classes = useStyles()

  const { appState } = React.useContext(Store)
  const modalSize = appState.edittingPrams.modalSize
  const { isEditting, footerItem } = appState.edittingPrams

  // -------------------
  const [titleText, setTitleText] = React.useState(isEditting ? footerItem.icon_name : "");
  const [editorText, setEditorText] = React.useState(isEditting ? footerItem.item_content : "");
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(isEditting ? footerItem.item_excerpt : "");
  const [createdAt, setCreatedAt] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState("");
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    isEditting ? IconsSetting.convertIconComponentFromName(footerItem.displayed_icon_name) : null
  );
  const [onTap, setOnTap] = React.useState(isEditting ? footerItem.on_tap : "modal");
  const [linkUrl, setLinkUrl] = React.useState(isEditting ? footerItem.link_url : "");
  const [appLinkUrl, setAppLinkUrl] = React.useState(isEditting ? footerItem.app_link_url : "");

  const [charCountFooterItemContent, setCharCountFooterItemContent] = React.useState(0);
  
  const createFooterItem = useCreateFooterItem();
  const updateFooterItem = useUpdateFooterItem();

  const handleOnChangeIconName = (e) => {
    setTitleText(e.target.value);
  };


  const handleSubmit = ({ is_published }) => {
    const params: TCreateFooterItem = {
      is_published,
      titleText,
      selectedIcon,
      onTap,
      editorText,
      editorTextExcerpt,
      linkUrl,
      modalSize,
      appLinkUrl,
    };
    if (isEditting) {
      updateFooterItem(params);
    } else {
      createFooterItem(params);
    }
  };

  let mainField: JSX.Element
  if (onTap === "modal") {
    mainField = (
      <div>
        <SelectModalSize />
        <QuillEditor
          editorText={editorText}
          setEditorText={setEditorText}
          setEditorTextExcerpt={setEditorTextExcerpt}
          charCount={charCountFooterItemContent}
          setCharCount={setCharCountFooterItemContent}
        />
      </div>
    );
  } else if (onTap === "link"){
    mainField = (
      <div>
      <TextField
        id="linkUrl"
        label="リンクURL"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        className={classes.linkTextField}
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
        {isEditting ? "アイテム編集" : "アイテム作成"}
      </Typography>
      <TextField
        id="icon-name-text-field"
        label="アイテム名"
        value={titleText}
        onChange={(e) => handleOnChangeIconName(e)}
        className={classes.titleText}
      />
      <CharCounter charCount={titleText.length} limitCount={100} />
      <br />

      <SwitchOnTapModal onTap={onTap} setOnTap={setOnTap} />
      {mainField}

      <SelectIcon selectedIcon={selectedIcon} dispatchSelectedIcon={dispatchSelectedIcon}/>
      <Grid container className={classes.submitButtons}>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ is_published: true })}
            disabled={
              titleText.length < 101 && charCountFooterItemContent < 1001
                ? false
                : true
            }
          >
            {isEditting ? "更新" : "投稿"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleSubmit({ is_published: false })}
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
