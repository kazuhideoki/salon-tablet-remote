import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Store } from '../Store/Store'
import { UpdateButton } from './viewComponents/buttons/UpdateButton'
import dynamic from 'next/dynamic';
import { Edit } from '@material-ui/icons';
import { EditButtonsBox } from './viewComponents/buttons/EditButtonsBox';
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const useInfoBarProps = () => {

  const { appState, dispatchAppState } = React.useContext(Store);
  const { infoBarData, isSetting } = appState;
  const { infoBar, targetArticle } = infoBarData;
  const { shop_name } = appState.userInfo

  const handleOnClick = () => {
    dispatchAppState({ type: "OPEN_MODAL", payload: "edit_info_bar" });
  };

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    handleOnClick,
    shop_name,
  };
}

export type TUseInfoBarProps = ReturnType<typeof useInfoBarProps>

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    editButtonsBox: {
      position: "absolute",
      top: theme.spacing(1),
      right: 0,
      zIndex: 100,

    },
  });
})

export const InfoBarPresenter: React.FC<TUseInfoBarProps> = (props) => {
         const classes = useStyles();

         let displayInfoBar = <></>;
         switch (props.infoBar.info_bar_type) {
           case "shop_name":
             displayInfoBar = (
               <Typography align="center" variant="h5">
                 {props.shop_name || "SALON TABLET"}
               </Typography>
             );
             break;
           case "scrolling_sentence":
             displayInfoBar = (
               <>
                 <div
                   dangerouslySetInnerHTML={{
                     __html: props.infoBar.scrolling_sentence,
                   }}
                 />
               </>
             );
             break;
           case "article":
             displayInfoBar = (
               <div
                 onClick={() =>
                   props.dispatchAppState({
                     type: "OPEN_ARTICLE_MODAL_FROM_INFO_BAR",
                     payload: props.targetArticle,
                   })
                 }
               >
                 <Typography variant="caption">
                   {props.targetArticle.title}{" "}
                   {props.targetArticle.article_excerpt}
                 </Typography>
                 {/* <Typography variant="caption"></Typography> */}
               </div>
             );
             break;

           default:
             break;
         }

         return (
           <div className={classes.root}>
             {props.isSetting ? (
               <EditButtonsBox className={classes.editButtonsBox}>
                 <UpdateButton onClick={props.handleOnClick} />
               </EditButtonsBox>
             ) : null}
             {displayInfoBar}
           </div>
         );
       };

export const InfoBar = () => {
  const props = useInfoBarProps()

  return <InfoBarPresenter {...props}/>
}
