import React from 'react';
import {
  Grid,
  CardActionArea,
  Card,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { EditButtonsBox } from '../../../../components/editButtonBox/EditButtonsBox';
import { showDataType } from './showDataType';
import { Skeleton } from '@material-ui/lab';
import { Article } from '../../../../../util/interface/Interface';
import { ThemeContext } from '../../../../stores/theme/ThemeProvider';
import { DisplayProps } from './DisplayArticlesScroll';

const useStyles = makeStyles((theme) => {
  const themes = React.useContext(ThemeContext);

  // 画像にかかるpaddingはここで決める
  // Mainの縦の高さからも計算するため
  const itemPadding = theme.spacing(1);

  return createStyles({
    itemRoot: {
      height: '50%',
      padding: 0,
    },
    rowRoot: {
      // height: '50%',
    },
    gridItem: {
      position: 'relative',
      // height: `calc(${themes.pMain.height}vh / 2)`,
      // height: `calc(${themes.pMain.height(themes.margin)})`,
      width: '33%',
      padding: itemPadding,
    },
    cardActionArea: {
      position: 'relative',
      height: '100%',
      flexGrow: 1,
    },
    cardContent: {
      height: '100%',
    },
    thumbnail: {
      display: 'block',
      width: '100%',
      height: `calc((${themes.pMain.height(themes.margin)}) / 2 - ${
        itemPadding * 2
      }px)`,
      objectFit: 'cover',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    readMore: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(4),
      left: theme.spacing(4),
    },
  });
});

export const DisplayArticlesGrid6: React.FC<DisplayProps> = ({
  props,
  classes,
  StyledCardContent,
}) => {
  const classesGrid6 = useStyles();

  const row = (articles: Article[], row2: boolean) =>
    articles.map((value, index) => {
      return (
        <Grid
          item
          key={index}
          // 投稿済みか下書きかで見た目を変える
          className={`${classesGrid6.gridItem}
            ${!value.is_published ? classes.itemIsDraft : ''}
          `}>
          {props.isSetting ? (
            <EditButtonsBox
              className={classes.editButtonsBox}
              handleUpdateButton={{
                onClick: () => props.onClickUpdate(value),
              }}
              handleDeleteButton={{
                onClick: () => props.deleteArticle(value.article_id),
              }}
            />
          ) : null}
          <CardActionArea
            className={classesGrid6.cardActionArea}
            onClick={() => props.openArticleModal(row2 ? index + 3 : index)}
            component="div">
            <Card className={classes.card}>
              <StyledCardContent
                className={`${classes.cardContent} ${classesGrid6.cardContent}`}>
                {showDataType(value.data_type, classes.showDataType)}

                <div className={classes.thumbnailDiv}>
                  {props.loading ? (
                    <Skeleton
                      variant="rect"
                      className={classesGrid6.thumbnail}
                      style={{ marginBottom: '32px' }}
                    />
                  ) : value.article_img.length ? (
                    <img
                      className={`p-main-thumbnail-grid6 ${classesGrid6.thumbnail}`}
                      src={value.article_img}
                    />
                  ) : (
                    <div
                      className={`p-main-thumbnail-grid6 ${classesGrid6.thumbnail}`}></div>
                  )}
                  {props.loading ? null : (
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.title}>
                      {props.loading ? null : <>{value.title}</>}
                    </Typography>
                  )}
                </div>
              </StyledCardContent>
              {/* 
            {props.loading ? null : (
              <Button
                // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
                component="div"
                variant="contained"
                color="primary"
                size="small"
                className={classesGrid6.readMore}
              >
                Read
              </Button>
            )} */}
            </Card>
          </CardActionArea>
        </Grid>
      );
    });

  const row1Articles = props.articles.filter((value, index) => {
    return index < 3;
  });
  const row2Articles = props.articles.filter((value, index) => {
    return index >= 3;
  });

  return (
    <>
      <Grid item className={classesGrid6.itemRoot}>
        <Grid
          container
          direction="row"
          wrap="wrap"
          className={classesGrid6.rowRoot}>
          {row(row1Articles, false)}
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          wrap="wrap"
          className={classesGrid6.rowRoot}>
          {row(row2Articles, true)}
        </Grid>
      </Grid>
    </>
  );
};
