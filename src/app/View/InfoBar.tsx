import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Store } from '../Store/Store'
import { UpdateButton } from './viewComponents/buttons/UpdateButton'
import { EditButtonsBox } from './viewComponents/buttons/EditButtonsBox';

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

export type TUseInfoBarProps = ReturnType<typeof useInfoBarProps> & {className?: string}

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
      // maxWidth: '100vw'
      display: "inline-block",
      paddingLeft: "100%",
      whiteSpace: "nowrap",
      lineHeight: "1em",
      animationName: "infoBarscrollAnime",
      // データベースに保存したscrolling_animation_durationを適応。文字数に応じて自動で計算されている
      animationDuration: (props: { scrolling_animation_duration: number }) =>
        `${props.scrolling_animation_duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },

    "@global": {
      "#scrolling_sentence_dangerously_set_inner_html > *": {
        display: "inline-block",
      },
      "@keyframes infoBarscrollAnime": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },
  });
});

export const InfoBarPresenter: React.FC<TUseInfoBarProps> = (props) => {
         const classes = useStyles({ scrolling_animation_duration: props.infoBar.scrolling_animation_duration });

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

         return (
           <div className={`${classes.root} ${props.className}`}>
             {props.isSetting ? (
               <EditButtonsBox className={classes.editButtonsBox}>
                 <UpdateButton onClick={props.handleOnClick} />
               </EditButtonsBox>
             ) : null}
             {displayInfoBar}
           </div>
         );
       };

export const InfoBar = ({className = ''}) => {
  const props = useInfoBarProps()

  return <InfoBarPresenter {...props} className={className}/>
}

export default InfoBar
