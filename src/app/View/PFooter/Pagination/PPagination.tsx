import React from "react";
import { Store } from "../../../Store/Store";
import { Home } from "@material-ui/icons";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { Prev } from "./Prev";
import { Latest } from "./Latest";
import { DisplayNumbers } from "./DisplayNumbers";
import { Oldest } from "./Oldest";
import { Next } from "./Next";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PageNumber } from "./PageNumber";
import { PaginationArrows } from "./PaginationArrows";

export const usePPaginationProps = () => {
  const getArticles = useGetArticles();
  const { paginationParams, dispatchLoading } = React.useContext(Store);

    const hundleOnNumClick = (num) => {
      dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
      getArticles(num);
    };

  return {
    getArticles,
    paginationParams,
    dispatchLoading,
    hundleOnNumClick,,
  };
};
type Props = ReturnType<typeof usePPaginationProps>


const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    icon: {
        fontSize: themes.iconSmall,
    },
    nums: {
        fontSize:  themes.iconSmall * 0.7,
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
  })
})

export type pageArrowProps = {
    classesDisable?: string;
    classesIcon?: string;
};

export const PPaginationPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={1}>
      <Typography variant="subtitle1">
        <HomeButton className={classes.icon} getArticles={props.getArticles} />
        <PageNumber className={classes.nums} paginationParams={props.paginationParams}/>
        <PaginationArrows classes={classes} />
      </Typography>
    </Grid>
  );
};

export const PPagination = () => {
  const props = usePPaginationProps()
  // usePPaginationProps使うときは記述し直す
  
  return <PPaginationPresenter {...props}/>
}