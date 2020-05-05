import React from "react";
import { Store } from "../../Store/Store";
import { Home, Label, Person } from "@material-ui/icons";
import { ThemeType } from "../../Store/ThemeContext";
import { useStylesFactory } from "../../Store/useStylesFactory";
import { Grid } from "@material-ui/core";
import { Prev } from "./Prev";
import { Latest } from "./Latest";
import { DisplayNumbers } from "./DisplayNumbers";
import { Oldest } from "./Oldest";
import { Next } from "./Next";
import { useGetPost } from "../../Store/articles/articlesActionCreator";

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
    classesDisable?: string;
    classesIcon?: string;
};

export const PPagination = () => {
    const [changedPagination, setChangedPagination] = React.useState(false)
    const classes = useStylesFactory(styles);
    const {
        paginationParams,
        dispatchPaginationParams,
        dispatchAppState,
    } = React.useContext(Store);
    const { page, pageCount} = paginationParams;
    const getPost = useGetPost()

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
        return (
          <Home
            onClick={() => getPost(1)}
            className={classes.icon}
          />
        );
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