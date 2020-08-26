import React, { DOMElement } from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Store } from '../Store/Store'
import { UpdateButton } from './viewComponents/buttons/UpdateButton'
import dynamic from 'next/dynamic';
import { Edit } from '@material-ui/icons';
import { EditButtonsBox } from './viewComponents/buttons/EditButtonsBox';
// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

const useInfoBarProps = () => {

  const { appState, dispatchAppState } = React.useContext(Store);
  const { infoBarData, isSetting } = appState;
  const { infoBar, targetArticle, scrollingSentenceLength } = infoBarData;
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
    scrollingSentenceLength,
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
    scrollingSentenceDiv: {
      margin: "auto",
      width: "96%",
      lineHeight: "1.5em",
      textAlign: "center",
      overflow: "hidden",
    },
    scrollingSentence: {
      display: "inline-block",
      paddingLeft: "100%",
      whiteSpace: "nowrap",
      lineHeight: "1em",
      animationName: "infoBarscrollAnime",
      animationDuration: (props: { stringLength: number }) => `${props.stringLength}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },

    "@global": {
      "#scrolling_sentence_dangerously_set_inner_html > *": {
        display: "inline-block",
      },
      "@keyframes infoBarscrollAnime": {
        // '0%': { transform: 'translateX(0)'},
        from: { transform: "translateX(0)" },
        // '100%': { transform: 'translateX(-100%)'},
        to: { transform: "translateX(-100%)" },
      },
    },
  });
});

export const InfoBarPresenter: React.FC<TUseInfoBarProps> = (props) => {
        const stringLength = 32 * props.scrollingSentenceLength / 245

         const classes = useStyles({stringLength});

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
               <div className={classes.scrollingSentenceDiv}>
                 <div
                   dangerouslySetInnerHTML={{
                     __html: `${props.infoBar.scrolling_sentence}`,
                   }}
                   className={classes.scrollingSentence}
                   id="scrolling_sentence_dangerously_set_inner_html"
                 />
               </div>
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
                   <span id="scrolling_sentence">
                     <b>{props.targetArticle.title}</b>
                     {"  "}
                     {props.targetArticle.article_excerpt}
                   </span>
                 </Typography>
               </div>
             );
             break;

           default:
             break;
         }

        //  React.useEffect(() => {
        //    if (process.browser) {
        //      console.log('infoBarのuseEffect,process.browserだよ');
             
        //      const scrollingSentence = document.getElementById(
        //        "scrolling_sentence"
        //      );
        //      console.log("scrollingSentenceは " + scrollingSentence);
        //      console.log("refは " + JSON.stringify(ref));
             
        //     //  if (ref) {
        //     //    ref.あcurrent.scrollTo({
        //     //      left: 500,
        //     //      behavior: "smooth",
        //     //    });
        //     //  }
        //     if (scrollingSentence) {
        //       scrollingSentence.scrollTo({
        //         left: 500,
        //         behavior: "smooth",
        //       });
        //     }
             
        //    }
        //  },[ref])

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

export default InfoBar
