import React from 'react';
import {
  Grid,
  CardContent,
  makeStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import { DisplayArticlesScroll } from './components/DisplayArticlesScroll';
import { DisplayArticlesGrid6 } from './components/DisplayArticlesGrid6';
import { DisplayInstagramMedias } from './components/DisplayInstagramMedias';
import { noArticlesJsx } from './components/noArticlesJsx';
import { MainPresenterProps, useMainProps } from './useMainProps';

// 主に位置情報に関するスタイルは親コンポーネントからpropsを通して渡される。
const useStyles = makeStyles((theme) => {
  const cardWidth = 350;

  return createStyles({
    root: {
      overflow: 'scroll',
      height: '100%',
    },
    rootGrid6: {
      overflowY: 'hidden',
    },
    gridItem: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    itemIsDraft: {
      border: '3px solid red',
    },
    cardActionArea: {
      position: 'relative',
      width: cardWidth,
      height: '100%',
      flexGrow: 1,
    },
    card: {
      overflowY: 'scroll',
      height: '100%',
    },
    editButtonsBox: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),

      zIndex: 10,
    },
    showDataType: {
      position: 'absolute',
      top: 0,
      left: 0,

      zIndex: 10,
    },
    cardContent: {
      position: 'relative',
      padding: 0,
    },
    thumbnailDiv: {
      position: 'relative',
    },
    thumbnail: {
      display: 'block',
      width: '100%',
      objectFit: 'cover',
      height: '300px',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    title: {
      width: '100%',
      bottom: 0,
      padding: '40px 10px 0 10px',
      position: 'absolute',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)',
    },
    playIcon: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: 'white',
      fontSize: '60px',
    },
    tagsAndDate: {
      display: 'flex',
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(
        1
      )}px`,
    },
    tags: {
      flexGrow: 1,
    },
    date: {
      margin: theme.spacing(2),
    },

    excerpt: {
      fontSize: '1rem',
      margin: `${theme.spacing(1)}px`,
    },
    readMore: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      left: theme.spacing(3),
    },
  });
});

export type MainClasses = ReturnType<typeof useStyles>;

export const StyledCardContent = withStyles({
  root: {
    '&:last-child': {
      padding: 0,
    },
  },
})(CardContent);
export type StyledCardContentType = typeof StyledCardContent;

export const MainPresenter: React.FC<MainPresenterProps> = (props) => {
  const classes = useStyles();

  const displayArticlesScroll = (
    <DisplayArticlesScroll
      props={props}
      classes={classes}
      StyledCardContent={StyledCardContent}
    />
  );
  const displayArticlesGrid6 = (
    <DisplayArticlesGrid6
      props={props}
      classes={classes}
      StyledCardContent={StyledCardContent}
    />
  );

  const displayInstagramMedias = (
    <DisplayInstagramMedias
      props={props}
      classes={classes}
      StyledCardContent={StyledCardContent}
    />
  );

  const noArticles = noArticlesJsx(classes, StyledCardContent);

  let displayContent;

  if (props.isShowInstagram) {
    if (props.instagramMediaObject.data.length) {
      displayContent = displayInstagramMedias;
    } else {
      displayContent = noArticles;
    }
  } else {
    if (props.articles.length) {
      switch (props.show_article_type) {
        case 'scroll':
          displayContent = displayArticlesScroll;
          break;
        case 'grid6':
          displayContent = displayArticlesGrid6;
          break;

        default:
          displayContent = displayArticlesScroll;
          break;
      }
    } else {
      displayContent = noArticles;
    }
  }

  return (
    <Grid
      id="p_main"
      container
      direction={
        props.show_article_type !== 'scroll' && props.isShowInstagram === false
          ? 'column'
          : 'row'
      }
      wrap="nowrap"
      className={`${classes.root} ${
        props.show_article_type === 'grid6' ? classes.rootGrid6 : ''
      }`}
      spacing={2}>
      {displayContent}
    </Grid>
  );
};

export const Main = () => {
  const props = useMainProps();

  return <MainPresenter {...props} />;
};
