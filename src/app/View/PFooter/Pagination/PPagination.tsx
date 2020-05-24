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

export const PPagination = () => {
    const [changedPagination, setChangedPagination] = React.useState(false)
    const classes = useStyles();
    const {
        paginationParams,
    } = React.useContext(Store);
    const { page, pageCount} = paginationParams;
    const getArticles = useGetArticles();

    const props = {
      classes,
      page,
      pageCount,
      changedPagination,
    };
    type Props = typeof props

    const PaginationPresenter = ({
      classes,
      page,
      pageCount,
    }: Props) => {
        const hundleOnClick = () => {
            return 0
        }

      const HomeButton = () => {
        return <Home onClick={() => getArticles(1)} className={classes.icon} />;
      };
      const PageNumber = () => {
        return (
          <p className={classes.nums}>
            【 {page}/{pageCount} 】
          </p>
        );
      };

      const PaginationArrows = () => (
        <Grid item className={classes.pagination}>
          <Latest
            classesDisable={classes.disable}
            classesIcon={classes.icon}
          />
          <Prev
            classesDisable={classes.disable}
            classesIcon={classes.icon}
          />
          <DisplayNumbers/>
          <Next
            classesDisable={classes.disable}
            classesIcon={classes.icon}
          />
          <Oldest
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