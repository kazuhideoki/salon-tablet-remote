import React from "react";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("./Editor/QuillEditor"), {
  ssr: false,
});
import { Button, TextField, Typography, CircularProgress, makeStyles, createStyles, Theme, Grid } from "@material-ui/core";


const useInfoBarEditorProps = () => {


  return {
   
  };

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
  })
);

export type TUseInfoBarEditorProps = ReturnType<typeof useInfoBarEditorProps>

export const InfoBarEditorPresenter: React.FC<TUseInfoBarEditorProps> = (
         props
       ) => {
         const classes = useStyles();

         return (
           <div>
             <Typography variant="h4" component="h2" className={classes.header}>
               インフォの設定
             </Typography>
             
          
           
           </div>
         );
       };

const InfoBarEditor = () => {
  const props = useInfoBarEditorProps()

  return <InfoBarEditorPresenter {...props}/>
}
export default InfoBarEditor

