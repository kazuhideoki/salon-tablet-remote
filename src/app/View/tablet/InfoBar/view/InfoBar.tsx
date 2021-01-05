import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  CardActionArea,
} from '@material-ui/core';
import { EditButtonsBox } from '../../../../components/editButtonBox/EditButtonsBox';
import { useStateInfoBar } from '../context/useStateInfoBar';
import { useDrawerProps } from '../../Drawer/Drawer/view/Drawer';
import { useOpenArticleModalInfoBar } from '../context/useOpenArticleModalInfoBar';

const useInfoBarProps = () => {
  const {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    shop_name,
  } = useStateInfoBar();
  const openArticleModalInfoBar = useOpenArticleModalInfoBar();

  const { openModal } = useDrawerProps();

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    openModal,
    shop_name,
    openArticleModalInfoBar,
  };
};

export type TUseInfoBarProps = ReturnType<typeof useInfoBarProps> & {
  className?: string;
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
    },
    editButtonsBox: {
      position: 'absolute',
      top: theme.spacing(1),
      right: 0,
      zIndex: 101,
    },
    scrollingSentenceDiv: {
      margin: 'auto',
      width: '96%',
      lineHeight: '1.5em',
      textAlign: 'center',
      overflow: 'hidden',
    },
    shadow: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background:
        'linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,1) 100%)',
    },
    scrollingSentence: {
      // maxWidth: '100vw'
      display: 'inline-block',
      paddingLeft: '100%',
      whiteSpace: 'nowrap',
      lineHeight: '1em',
      animationName: 'infoBarscrollAnime',
      // データベースに保存したscrolling_animation_durationを適応。文字数に応じて自動で計算されている
      animationDuration: (props: { scrolling_animation_duration: number }) =>
        `${props.scrolling_animation_duration}s`,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
    article: {
      margin: `0 ${theme.spacing(2)}`,
    },

    '@global': {
      '#scrolling_sentence_dangerously_set_inner_html > *': {
        display: 'inline-block',
      },
      '@keyframes infoBarscrollAnime': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(-100%)' },
      },
    },
  });
});

export const InfoBarPresenter: React.FC<TUseInfoBarProps> = (props) => {
  const classes = useStyles({
    scrolling_animation_duration: props.infoBar.scrolling_animation_duration,
  });

  let displayInfoBar = <></>;
  switch (props.infoBar.info_bar_type) {
    case 'shop_name':
      displayInfoBar = (
        <Typography align="center" variant="h5">
          {props.shop_name || 'SALON TABLET'}
        </Typography>
      );
      break;
    case 'scrolling_sentence':
      displayInfoBar = (
        <>
          <div className={classes.shadow}></div>
          <div className={classes.scrollingSentenceDiv}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${props.infoBar.scrolling_sentence}`,
              }}
              className={classes.scrollingSentence}
              id="scrolling_sentence_dangerously_set_inner_html"
            />
          </div>
        </>
      );
      break;
    case 'article':
      displayInfoBar = (
        <CardActionArea
          onClick={() => props.openArticleModalInfoBar(props.targetArticle)}
          className={classes.article}>
          <Typography variant="caption">
            <span id="scrolling_sentence">
              <b>{props.targetArticle.title}</b>
              {'  '}
              {props.targetArticle.article_excerpt}
            </span>
          </Typography>
        </CardActionArea>
      );
      break;

    default:
      break;
  }

  return (
    <div className={`${classes.root} ${props.className}`}>
      {props.isSetting ? (
        <EditButtonsBox
          className={classes.editButtonsBox}
          handleUpdateButton={{
            onClick: () => props.openModal('edit_info_bar'),
          }}
        />
      ) : null}
      {displayInfoBar}
    </div>
  );
};

export const InfoBar = ({ className = '' }) => {
  const props = useInfoBarProps();

  return <InfoBarPresenter {...props} className={className} />;
};

export default InfoBar;
