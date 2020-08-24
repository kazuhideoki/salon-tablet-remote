import React from "react";
import dynamic from "next/dynamic";
const SmallQuillEditor = dynamic(() => import("./SmallQuillEditor"), {
  ssr: false,
});
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from "../../../Store/Store";
import { CharCounter } from "../../viewComponents/CharCounter";
import { SwitchOnTapInfoBar } from "./SwitchOnTapInfoBar";
import { SelectArticleInfoBar } from "./SelectArticleInfoBar";
import { T_info_bar_update } from "../../../../pages/api/info_bar/update";
import { useUpdateInfoBar } from "../../../ActionCreator/infoBar/useUpdateInfoBar";


const useInfoBarEditorProps = () => {
  const { appState } = React.useContext(Store)
  const { info_bar_type, scrolling_sentence, selected_article_on_info_bar } = appState.infoBar;
  
  const [infoBarType, setInfoBarType] = React.useState(info_bar_type);
  const [editorText, setEditorText] = React.useState(scrolling_sentence);
  const [articleInfoBar, setArticleInfoBar] = React.useState(
    selected_article_on_info_bar as number
  );
  const [charCount, setCharCount] = React.useState(0);

  const updateInfoBar = useUpdateInfoBar()

  const handleSubmit = () => {
    const params: T_info_bar_update = {
      user_id: appState.userInfo.user_id,
      info_bar_type: info_bar_type,
      scrolling_sentence: scrolling_sentence,
      selected_article_on_info_bar: selected_article_on_info_bar,
    };

    updateInfoBar(params)
    
  };


  return {
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    articleInfoBar,
    setArticleInfoBar,
    allArticles: appState.allArticles
  };

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    charCounter: {
      textAlign: 'right'
    }
  })
);

export type TUseInfoBarEditorProps = ReturnType<typeof useInfoBarEditorProps>

export const InfoBarEditorPresenter: React.FC<TUseInfoBarEditorProps> = (
         props
       ) => {
         const classes = useStyles();

         let mainField: JSX.Element = null
         switch (props.infoBarType) {
           case 'shop_name':
             break;
           case 'scrolling_sentence':
             mainField = <>
              <SmallQuillEditor
                editorText={props.editorText}
                setEditorText={props.setEditorText}
                setCharCount={props.setCharCount}
              />
              <div className={classes.charCounter}>
                <CharCounter
                  charCount={props.charCount}
                  limitCount={500}
                  isShowCount
                />

              </div>
             </>
             break;
           case 'article':
             mainField = <><SelectArticleInfoBar articleInfoBar={props.articleInfoBar} setArticleInfoBar={props.setArticleInfoBar} AllArticles={props.allArticles}/></>
             break;
         
           default:
             break;
         }


         return (
           <div>
             <Typography variant="h4" component="h2" className={classes.header}>
               インフォの設定
             </Typography>

             <SwitchOnTapInfoBar infoBarType={props.infoBarType} setInfoBarType={props.setInfoBarType}/>

             {mainField}

             
           </div>
         );
       };

const InfoBarEditor = () => {
  const props = useInfoBarEditorProps()

  return <InfoBarEditorPresenter {...props}/>
}
export default InfoBarEditor

