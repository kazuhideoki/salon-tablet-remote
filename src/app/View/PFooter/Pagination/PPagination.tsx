import React from "react";
import { Store } from "../../../Store/Store";
import { Home } from "@material-ui/icons";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Prev } from "./Prev";
import { Latest } from "./Latest";
import { DisplayNumbers } from "./DisplayNumbers";
import { Oldest } from "./Oldest";
import { Next } from "./Next";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PageNumber } from "./PageNumber";
import { PaginationArrows } from "./PaginationArrows";

// export const usePPaginationProps = () => {
//   const { paginationParams } = React.useContext(Store);
//   const { page, pageCount } = paginationParams;
//   const getArticles = useGetArticles();

//   return {
//     page,
//     pageCount,
//     getArticles,
//   };
// };
// type Props = ReturnType<typeof usePPaginationProps>


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

export const PPaginationPresenter = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={1}>
      <HomeButton classes={classes} />
      <PageNumber classes={classes}/>
      <PaginationArrows classes={classes}/>
    </Grid>
  );
};

export const PPagination = () => {
  // usePPaginationProps使うときは記述し直す
  
  return <PPaginationPresenter />
}