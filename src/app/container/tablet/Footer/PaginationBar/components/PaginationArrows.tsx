import React from 'react';
import { Grid, withStyles, IconButton } from '@material-ui/core';
import { Latest } from './PaginationArrowsComponents/Latest';
import { Prev } from './PaginationArrowsComponents/Prev';
import { DisplayNumbers } from './PaginationArrowsComponents/DisplayNumbers';
import { Next } from './PaginationArrowsComponents/Next';
import { Oldest } from './PaginationArrowsComponents/Oldest';
import { PaginationPresenterPropsAndClasses } from '../PaginationBar';

export const PaginationArrows: React.FC<PaginationPresenterPropsAndClasses> = (
  props
) => {
  return (
    <Grid item className={props.classes.pagination}>
      <Latest {...props} />
      <Prev {...props} />
      <DisplayNumbers {...props} />
      <Next {...props} />
      <Oldest {...props} />
    </Grid>
  );
};
