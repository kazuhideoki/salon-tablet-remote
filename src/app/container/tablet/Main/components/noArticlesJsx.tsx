import React from 'react';
import { Grid, CardActionArea, Card, Typography } from '@material-ui/core';
import { MainClasses, StyledCardContentType } from '../Main';

// 記事がなかった場合の表示
export const noArticlesJsx = (
  classes: MainClasses,
  StyledCardContent: StyledCardContentType
) => (
  <Grid item>
    <CardActionArea className={classes.cardActionArea} component="div">
      <Card className={classes.card}>
        <StyledCardContent className={classes.cardContent}>
          <div className={classes.thumbnailDiv}>
            <div className={`p-main-thumbnail ${classes.thumbnail}`}></div>
          </div>

          <div className={`p-main-article-excerpt ${classes.excerpt}`}>
            <Typography gutterBottom variant="subtitle1" align="center">
              記事がありません
            </Typography>
          </div>
        </StyledCardContent>
      </Card>
    </CardActionArea>
  </Grid>
);
