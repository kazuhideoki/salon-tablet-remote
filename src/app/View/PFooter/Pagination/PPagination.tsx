import React from "react";
import { Store } from "../../../Store/Store";
import { Home } from "@material-ui/icons";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography, SvgIcon } from "@material-ui/core";
import { Prev } from "./Prev";
import { Latest } from "./Latest";
import { DisplayNumbers } from "./DisplayNumbers";
import { Oldest } from "./Oldest";
import { Next } from "./Next";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PageNumber } from "./PageNumber";
import { PaginationArrows } from "./PaginationArrows";
import { LoadingAction } from "../../../Reducer/loadingReducer";

export const usePPaginationProps = () => {
  const getArticles = useGetArticles();
  const { paginationParams, dispatchLoading } = React.useContext(Store);
  
  const handleOnNumClick = (num) => {
    dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
    getArticles(num);
  };

  return {
    getArticles,
    paginationParams,
    dispatchLoading,
    handleOnNumClick,
  };
};
export type TUsePPaginationProps = ReturnType<typeof usePPaginationProps>


const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    // Grid containerのroot
    root: {
      display: "flex",
      alignItems: "center",
      fontSize: themes.iconSmall,
    },
    home: {
      fontSize: "inherit",
    },
    displayPage: {
      fontSize: "0.8em",
    },
    paginationArrows: {
      fontSize: "inherit",
    },

    nums: {
      border: "none",
      backgroundColor: "transparent",
      fontSize: "0.8em",
      margin: "0 8px"
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
      alignItems: "center",
    },
  });
})

export type TPPaginationClasses = ReturnType<typeof useStyles>

export const PPaginationPresenter: React.FC<TUsePPaginationProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={1} className={classes.root}>
      <Typography variant="subtitle1" component="span" className={classes.home}>
        <SvgIcon fontSize="inherit" onClick={() => props.getArticles(1)}>
          <Home />
        </SvgIcon>
      </Typography>
      <Typography variant="subtitle1" component="span" className={classes.displayPage}>
        【 {props.paginationParams.page}/{props.paginationParams.pageCount} 】
      </Typography>
      <Typography variant="subtitle1" component="span" className={classes.paginationArrows}>
        <PaginationArrows {...props} classes={classes} />
      </Typography>
    </Grid>
  );
};

export const PPagination = () => {
  const props = usePPaginationProps()
  
  return <PPaginationPresenter {...props}/>
}