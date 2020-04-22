import React from "react";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";
import { Home, Label, Person } from "@material-ui/icons";
import { ThemeType } from "../../Store/ThemeContext";
import { useStylesFactory } from "../../Store/useStylesFactory";
import { Grid } from "@material-ui/core";

import { Prev } from "./Prev";
import { Latest } from "./Latest";
import { DisplayNumbers } from "./DisplayNumbers";
import { Oldest } from "./Oldest";
import { Next } from "./Next";

const styles = {
  icon: {
    fontSize: (themes: ThemeType) => themes.iconSmall,
  },
  nums: {
    fontSize: (themes: ThemeType) => themes.iconSmall * 0.7,
    border: "none",
    backgroundColor: "transparent",
    margin: "auto 10px",
  },
  numsCurrent: {
    fontWeight: "bold",
  },
  disable: {
    color: "whitesmoke",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    width: 400,
  },
};

export type pageArrowProps = {
  setParams: (type: any) => void;
  classesDisable?: string;
  classesIcon?: string;
};

export const Pagination = () => {
  const classes = useStylesFactory(styles);
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchAppState,
  } = React.useContext(Store);
  const { currentPage, pageCount} = paginationParams;

  const openModal = (modalName: string) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: modalName });
  };

  const setParams = (arg: PaginationParamsAction) => {
    dispatchAppState({ type: "START_LOADING" });
    dispatchPaginationParams(arg);
  };

  const props = {
    classes,
    currentPage,
    openModal,
    setParams,
    pageCount,
  };
  type Props = typeof props

  const PaginationPresenter = ({
    classes,
    currentPage,
    openModal,
    setParams,
    pageCount,
  }: Props) => {
    const HomeButton = () => {
      return (
        <Home
          onClick={() => setParams({ type: "MAINHOME" })}
          className={classes.icon}
        />
      );
    };
    const PageNumber = () => {
      return (
        <p className={classes.nums}>
          【 {currentPage}/{pageCount} 】
        </p>
      );
    };

    const PaginationArrows = () => (
      <Grid item className={classes.pagination}>
        <Latest
          setParams={setParams}
          classesDisable={classes.disable}
          classesIcon={classes.icon}
        />
        <Prev
          setParams={setParams}
          classesDisable={classes.disable}
          classesIcon={classes.icon}
        />
        <DisplayNumbers setParams={setParams} />
        <Next
          setParams={setParams}
          classesDisable={classes.disable}
          classesIcon={classes.icon}
        />
        <Oldest
          setParams={setParams}
          classesDisable={classes.disable}
          classesIcon={classes.icon}
        />
      </Grid>
    );

    return (
      <Grid container justify="center" spacing={1}>
        <HomeButton />
        <PageNumber />
        <PaginationArrows />
      </Grid>
    );
  };

  return PaginationPresenter(props)

};