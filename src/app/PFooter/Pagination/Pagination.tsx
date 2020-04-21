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

type Props = {
  classes: Record<string, string>;
  currentPage: number;
  openModal: (modalName: string) => void;
  setParams: (type: any) => void;
  totalPages: number;
};

const PPaginationContainer = ({ presenter }: any) => {
  const classes = useStylesFactory(styles);
  const {
    paginationParams,
    dispatchPaginationParams,
    dispatchAppState,
    totalPages,
  } = React.useContext(Store);

  const currentPage = paginationParams.currentPage;
  const openModal = (modalName: string) => {
    dispatchAppState({ type: "OPEN_MODAL", payload: modalName });
  };

  // wpParamsReducerのWpParamsActionで上手く行かなった。検討の余地あり
  const setParams = (arg: PaginationParamsAction) => {
    dispatchAppState({ type: "START_LOADING" });
    dispatchPaginationParams(arg);
  };

  const props = {
    classes,
    currentPage,
    openModal,
    setParams,
    totalPages,
  };

  return presenter(props);
};

const PPaginationPresenter = ({
  classes,
  currentPage,
  openModal,
  setParams,
  totalPages,
}: Props) => {
  const HomeButton = () => {
    const arg = { type: "MAINHOME" };
    return <Home onClick={() => setParams(arg)} className={classes.icon} />;
  };
  const Tag = () => (
    <Label onClick={() => openModal("tag")} className={classes.icon} />
  );
  const Author = () => (
    <Person onClick={() => openModal("author")} className={classes.icon} />
  );

  const PageNumber = () => {
    return (
      <p className={classes.nums}>
        【 {currentPage}/{totalPages} 】
      </p>
    );
  };

  const SelectParams = () => (
    <>
      <Grid item>
        <HomeButton />
      </Grid>
    </>
  );

  const Pagination = () => (
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
      <SelectParams />
      <PageNumber />
      <Pagination />
    </Grid>
  );
};

export const Pagination = () => (
  <PPaginationContainer
    presenter={(props: Props) => <PPaginationPresenter {...props} />}
  />
);
