import React from 'react'
import { Card, Grid} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { StyledCardContent } from '../view/Main'



export const SkeltonMain = (props) => {
  return (
    <Grid container wrap="nowrap" className={props.classes.root} spacing={2}>
      <Grid
        item
        // 投稿済みか下書きかで見た目を変える
        className={props.classes.gridItem}
      >
        {/* CardActionArea必要なら入れる */}

        <Card className={props.classes.card}>
          <StyledCardContent className={props.classes.cardContent}>
            <Skeleton />

          </StyledCardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
