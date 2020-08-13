import React from 'react'
import { Grid, withStyles, IconButton } from "@material-ui/core";
import { Latest } from './PaginationArrows/Latest';
import { Prev } from './PaginationArrows/Prev';
import { DisplayNumbers } from './PaginationArrows/DisplayNumbers';
import { Next } from './PaginationArrows/Next';
import { Oldest } from "./PaginationArrows/Oldest";
import { TUsePPaginationProps, TPPaginationClasses, TPaginationPropsAndClasses } from './PPagination';

export const PaginationArrows:React.FC<TPaginationPropsAndClasses> = (props) => {

  return (
    <Grid item className={props.classes.pagination}>
      <Latest {...props} />
      <Prev {...props} />
      <DisplayNumbers {...props} />
      <Next {...props} />
      <Oldest {...props} />
    </Grid>
  );
}
