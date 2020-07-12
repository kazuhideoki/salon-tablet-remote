import React from 'react'
import { Grid, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Latest } from './Latest';
import { Prev } from './Prev';
import { DisplayNumbers } from './DisplayNumbers';
import { Next } from './Next';
import { Oldest } from "./Oldest";
import { LoadingAction } from '../../../Reducer/loadingReducer';
import { ThemeContext } from '../../../Store/ThemeContext';
import { usePPaginationProps, TUsePPaginationProps, TPPaginationClasses } from './PPagination';

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    disable: {
      color: "whitesmoke",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      width: 400,
      alignItems: "center",
    },
  });
})

export type TArrowProps = {
  classesDisable: string;
} & TUsePPaginationProps;

type Props = TUsePPaginationProps & {classes: TPPaginationClasses}

export const PaginationArrows = (props: Props) => {

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
