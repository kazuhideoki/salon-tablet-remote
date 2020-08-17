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
import { SelectAppLink } from './SelectAppLink';
import { Store } from "../../../Store/Store";
import { FooterItem, T_modal_size } from '../../../Store/Types';
import { CharCounter } from "../../viewComponents/CharCounter";
import { SelectModalSize } from '../../Setting/SelectModalSize';
import { selectedIconReducer } from '../../../Reducer/selectedIconReducer';
import { IconsSetting } from './iconSelect/icons';
import { HelpButton } from '../../viewComponents/buttons/HelpButton';
import { PublishTwoTone, SaveTwoTone } from '@material-ui/icons';

const useFooterItemEditorProps = () => {

  const { appState, dispatchAppState } = React.useContext(Store);
  const { modalSize, onTap, isEditting, footerItem } = appState.edittingPrams;
  const [titleText, setTitleText] = React.useState(
    isEditting ? footerItem.icon_name : ""
  );
  const [editorText, setEditorText] = React.useState(
    isEditting ? footerItem.item_content : ""
  );
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(
    isEditting ? footerItem.item_excerpt : ""
  );
  const [createdAt, setCreatedAt] = React.useState("");
  const [updatedAt, setUpdatedAt] = React.useState("");
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    isEditting
      ? IconsSetting.convertIconComponentFromName(
          footerItem.displayed_icon_name
        )
      : null
  );

  // 変更した値を保存する？ or...
  // const [onTap, setOnTap] = React.useState(isEditting ? footerItem.on_tap : "modal");

  const [linkUrl, setLinkUrl] = React.useState(
    isEditting ? footerItem.link_url : ""
  );
  const [appLinkUrl, setAppLinkUrl] = React.useState(
    isEditting ? footerItem.app_link_url : ""
  );

  const [
    charCountFooterItemContent,
    setCharCountFooterItemContent,
  ] = React.useState(0);

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

  return {
    dispatchAppState,
    onTap,
    isEditting,
    titleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    selectedIcon,
    dispatchSelectedIcon,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    charCountFooterItemContent,
    setCharCountFooterItemContent,
    handleOnChangeIconName,
    handleSubmit,
    modalSize,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    topDiv: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    title: {
      width: "50%",
      margin: `0 ${theme.spacing(2)}px`,
      maxWidth: "100%",
    },
    selectIcon: {
      margin: `0 ${theme.spacing(2)}px`,
    },

    switchOnTapModal: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    selectModalSize: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },

    linkTextField: {
      minWidth: "80%",
      maxWidth: "100%",
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    appLink: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },

    bottomDiv: {
      position: "sticky",
      bottom: 0,
      zIndex: 100,
    },
    charCounter: {
      // marginLeft: "auto",
      textAlign: "right",
    },
    submitButton: {
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
  })
);

export type TUseFooterItemEditorProps = ReturnType<typeof useFooterItemEditorProps>

export const FooterItemEditorPresenter: React.FC<TUseFooterItemEditorProps> = (
         props
       ) => {
         const classes = useStyles();

         let mainField: JSX.Element;
         if (props.onTap === "modal") {
           mainField = (
             <div>
               <SelectModalSize modalSize={props.modalSize} className={classes.selectModalSize}/>
               <QuillEditor
                 editorText={props.editorText}
                 setEditorText={props.setEditorText}
                 setEditorTextExcerpt={props.setEditorTextExcerpt}
                 charCount={props.charCountFooterItemContent}
                 setCharCount={props.setCharCountFooterItemContent}
               />
             </div>
           );
         } else if (props.onTap === "link") {
           mainField = (
             <div>
               <TextField
                 id="linkUrl"
                 label="リンクURL"
                 value={props.linkUrl}
                 onChange={(e) => props.setLinkUrl(e.target.value)}
                 className={classes.linkTextField}
               />
             </div>
           );
         } else if (props.onTap === "appLink") {
           mainField = (
             <div>
               <SelectAppLink
                 appLinkUrl={props.appLinkUrl}
                 setAppLinkUrl={props.setAppLinkUrl}
                 className={classes.appLink}
               />
             </div>
           );
         }

         return (
           <>
             <Typography variant="h4" component="h2" className={classes.header}>
               {props.isEditting ? "アイテム編集" : "アイテム作成"}
             </Typography>

             <div className={classes.topDiv}>
               <TextField
                 id="icon-name-text-field"
                 label="アイテム名"
                 multiline
                 value={props.titleText}
                 onChange={(e) => props.handleOnChangeIconName(e)}
                 className={classes.title}
               />
               <HelpButton content="名前がきれいに表示されないときは、改行するか短くしてみて下さい。" />
               <CharCounter
                 charCount={props.titleText.length}
                 limitCount={100}
               />
               <br />

               <SelectIcon
                 className={classes.selectIcon}
                 selectedIcon={props.selectedIcon}
                 dispatchSelectedIcon={props.dispatchSelectedIcon}
               />
             </div>

             <SwitchOnTapModal
               className={classes.switchOnTapModal}
               onTap={props.onTap}
               dispatchAppState={props.dispatchAppState}
             />

             {mainField}

             <div className={classes.bottomDiv}>
               <div className={classes.charCounter}>
                 <CharCounter
                   charCount={props.charCountFooterItemContent}
                   limitCount={1000}
                   align="right"
                   isShowCount
                 />
               </div>
               <Grid container>
                 <Grid item className={classes.submitButton}>
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={() => props.handleSubmit({ is_published: true })}
                     startIcon={<PublishTwoTone />}
                     disabled={
                       props.titleText.length < 101 &&
                       props.charCountFooterItemContent < 1001
                         ? false
                         : true
                     }
                   >
                     {props.isEditting ? "更新" : "投稿"}
                   </Button>
                 </Grid>
                 <Grid item>
                   <Button
                     onClick={() => props.handleSubmit({ is_published: false })}
                     startIcon={<SaveTwoTone />}
                     disabled={
                       props.titleText.length < 101 &&
                       props.charCountFooterItemContent < 1001
                         ? false
                         : true
                     }
                   >
                     下書き保存
                   </Button>
                 </Grid>
               </Grid>
             </div>
           </>
         );
       };

const FooterItemEditor = () => {
  const props = useFooterItemEditorProps()

  return <FooterItemEditorPresenter {...props}/>
}

export default FooterItemEditor
