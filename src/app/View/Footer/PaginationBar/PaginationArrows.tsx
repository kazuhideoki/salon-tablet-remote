import React from 'react'
import { Grid } from "@material-ui/core";
import { Latest } from './PaginationArrows/Latest';
import { Prev } from './PaginationArrows/Prev';
import { DisplayNumbers } from './PaginationArrows/DisplayNumbers';
import { Next } from './PaginationArrows/Next';
import { Oldest } from "./PaginationArrows/Oldest";
import { TUsePPaginationProps, TPPaginationClasses } from './PPagination';

export type TArrowProps = {
  classesDisable: string;
} & TUsePPaginationProps;

export type TPaginationArrows = TUsePPaginationProps & {classes: TPPaginationClasses}

export const PaginationArrows = (props: TPaginationArrows) => {

  return (
    <Grid item className={props.classes.pagination}>
      <Latest classesDisable={props.classes.disable} {...props} />
      <Prev classesDisable={props.classes.disable} {...props} />
      <DisplayNumbers
        paginationParams={props.paginationParams}
        handleOnNumClick={props.handleOnNumClick}
        nums={props.classes.nums}
        numsCurrent={props.classes.numsCurrent}
      />
      <Next classesDisable={props.classes.disable} {...props} />
      <Oldest classesDisable={props.classes.disable} {...props} />
    </Grid>
  );
}
