import React from "react";
import dynamic from "next/dynamic";
const SmallQuillEditor = dynamic(() => import("./SmallQuillEditor"), {
  ssr: false,
});
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import { Store } from "../../../Store/Store";
import { CharCounter } from "../../viewComponents/CharCounter";
import { SwitchOnTapInfoBar } from "./SwitchOnTapInfoBar";


const useInfoBarEditorProps = () => {
  const { appState } = React.useContext(Store)
  const { info_bar_type, scrolling_sentence } = appState.infoBar;
  
  const [infoBarType, setInfoBarType] = React.useState(info_bar_type);
  const [editorText, setEditorText] = React.useState(scrolling_sentence);
  const [charCount, setCharCount] = React.useState(0);


  return {
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    charCount,
    setCharCount,
  };

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    charCounter: {
      // position: 'relative',
      // right: 0,
      // bottom: 0,
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
             mainField = <></>
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

