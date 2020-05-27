import React from 'react'
import { Grid } from '@material-ui/core';
import { Latest } from './Latest';
import { Prev } from './Prev';
import { DisplayNumbers } from './DisplayNumbers';
import { Next } from './Next';
import { Oldest } from "./Oldest";

type Props = {
  classes?: any
}

export const PaginationArrows = ({classes}: Props) => {
  return (
    <Grid item className={classes.pagination}>
      <Latest classesDisable={classes.disable} classesIcon={classes.icon} />
      <Prev classesDisable={classes.disable} classesIcon={classes.icon} />
      <DisplayNumbers />
      <Next classesDisable={classes.disable} classesIcon={classes.icon} />
      <Oldest classesDisable={classes.disable} classesIcon={classes.icon} />
    </Grid>
  );
}
