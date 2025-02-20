import React from 'react';
import {
  Grid,
  CardActionArea,
  Card,
  Button,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { sqlToDate } from '../../../../../util/sqlToDate';
import { PlayArrowRounded } from '@material-ui/icons';
import { DisplayProps } from './DisplayArticlesScroll';

export const DisplayInstagramMedias: React.FC<DisplayProps> = ({
  props,
  classes,
  StyledCardContent,
}) => {
  return (
    <>
      {props.instagramMediaObject.data.map((value, index) => {
        return (
          <Grid item key={index} className={classes.gridItem}>
            <CardActionArea
              className={classes.cardActionArea}
              onClick={() => props.openInstagramModal(index)}>
              <Card className={classes.card}>
                <StyledCardContent className={classes.cardContent}>
                  <div className={classes.thumbnailDiv}>
                    {props.loading ? (
                      <Skeleton
                        variant="rect"
                        className={classes.thumbnail}
                        style={{ marginBottom: '32px' }}
                      />
                    ) : (
                      <>
                        <img
                          className={`p-main-thumbnail ${classes.thumbnail}`}
                          src={
                            value.media_type === 'VIDEO'
                              ? value.thumbnail_url
                              : value.media_url
                          }
                        />
                        {value.media_type === 'VIDEO' ? (
                          <PlayArrowRounded className={classes.playIcon} />
                        ) : null}
                      </>
                    )}
                  </div>

                  {props.loading ? null : (
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      align="right"
                      className={classes.date}>
                      {sqlToDate(value.timestamp)}
                    </Typography>
                  )}

                  <div className={`p-main-article-excerpt ${classes.excerpt}`}>
                    <Typography gutterBottom variant="body1">
                      {props.loading ? (
                        <>
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                          <Skeleton width="80%" style={{ margin: 'auto' }} />
                        </>
                      ) : (
                        <>
                          {value.caption && value.caption.slice(0, 100)}
                          {value.caption && value.caption.length > 100
                            ? '...'
                            : ''}
                        </>
                      )}
                    </Typography>
                  </div>
                </StyledCardContent>

                {props.loading ? null : (
                  <Button
                    // エラーが出る、表示がバグる原因かもしれないのでcomponent指定してみた。
                    component="div"
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.readMore}>
                    Read More
                  </Button>
                )}
              </Card>
            </CardActionArea>
          </Grid>
        );
      })}
    </>
  );
};
