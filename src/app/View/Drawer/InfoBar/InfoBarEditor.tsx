import React from "react";
import dynamic from "next/dynamic";
const SmallQuillEditor = dynamic(() => import("./SmallQuillEditor"), {
  ssr: false,
});
import { Button, Typography, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from "../../../Store/Store";
import { CharCounter } from "../../viewComponents/CharCounter";
import { SwitchOnTapInfoBar } from "./SwitchOnTapInfoBar";
import { SelectArticleInfoBar } from "./SelectArticleInfoBar";
import { useUpdateInfoBar, TUseUpdateInfoBar } from "../../../ActionCreator/infoBar/useUpdateInfoBar";
import { PublishTwoTone } from "@material-ui/icons";


const useInfoBarEditorProps = () => {
  const { appState } = React.useContext(Store)
  const { info_bar_type, scrolling_sentence, selected_article_id } = appState.infoBarData.infoBar;
  
  const [infoBarType, setInfoBarType] = React.useState(info_bar_type);
  const [editorText, setEditorText] = React.useState(scrolling_sentence);
  const [articleInfoBar, setArticleInfoBar] = React.useState(
    selected_article_id as number
  );
  const [charCount, setCharCount] = React.useState(0);

  const updateInfoBar = useUpdateInfoBar()

  const handleSubmit = () => {
    
    const params: TUseUpdateInfoBar = {
      infoBarType,
      editorText,
      articleInfoBar,
      ScrollingAnimationDuration: (32 * charCount) / 245 + 8, // アニメーションの再生時間がが文字数に応じて増え、どの文字数でもある程度同じスピードで再生されるように調整
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
    allArticles: appState.allArticles,
    handleSubmit,
  };

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    switchOnTapInfoBar: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    charCounter: {
      textAlign: "right",
    },
    selectArticleInfoBar: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    bottomDiv: {
      position: "sticky",
      bottom: 0,
      marginRight: theme.spacing(2),
      zIndex: 100,
    },
    submitButton: {
      marginLeft: "auto",
      marginRight: theme.spacing(1),
    },
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
             mainField = (
               <>
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
             );
             break;
           case 'article':
             mainField = (
               <>
                 <SelectArticleInfoBar
                   articleInfoBar={props.articleInfoBar}
                   setArticleInfoBar={props.setArticleInfoBar}
                   AllArticles={props.allArticles}
                   className={classes.selectArticleInfoBar}
                 />
               </>
             );
             break;
         
           default:
             break;
         }


         return (
           <div>
             <Typography variant="h4" component="h2" className={classes.header}>
               インフォの設定
             </Typography>

             <SwitchOnTapInfoBar
               infoBarType={props.infoBarType}
               setInfoBarType={props.setInfoBarType}
               className={classes.switchOnTapInfoBar}
             />

             {mainField}

             <div className={classes.bottomDiv}>
               <Grid container>
                 <Grid item className={classes.submitButton}>
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={() => props.handleSubmit()}
                     startIcon={<PublishTwoTone />}
                     disabled={
                       props.charCount < 501
                         ? false
                         : true
                     }
                   >
                     更新
                   </Button>
                 </Grid>
                 <Grid item>

                 </Grid>
               </Grid>
             </div>
           </div>
         );
       };

const InfoBarEditor = () => {
  const props = useInfoBarEditorProps()

  return <InfoBarEditorPresenter {...props}/>
}
export default InfoBarEditor

