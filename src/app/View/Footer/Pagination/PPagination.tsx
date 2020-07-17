import React from "react";
import { Store } from "../../../Store/Store";
import { Home } from "@material-ui/icons";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography, SvgIcon, Chip, IconButton } from "@material-ui/core";
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
import { TagsButton } from "./TagsButton";
import { selectedTagIdsToName } from "./selectedTagIdsToName";

export const usePPaginationProps = () => {
  const getArticles = useGetArticles();
  const { paginationParams, dispatchLoading, dispatchAppState, appState } = React.useContext(Store);
  
  const handleOnNumClick = (num) => {
    getArticles(num);
  };

  const showSelectedTags = () => (
    <div>
      {appState.selectedArticlesTags.map((value) => (
        <Chip label={selectedTagIdsToName(value)} size="small" />
      ))}
    </div>
  );

  return {
    getArticles,
    paginationParams,
    dispatchLoading,
    dispatchAppState,
    showSelectedTags,
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
    icons: {
      fontSize: "inherit",
    },
    icon: {
      // margin: "0 0.2em"
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
      margin: "0 0.5em"
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
      <Typography
        variant="subtitle1"
        component="span"
        className={classes.icons}
      >
        {/* <SvgIcon
          fontSize="inherit" */}
        <IconButton
          onClick={() => props.getArticles(1, [])}
          className={classes.icon}
        >
          <HomeButton />
          {/* </IconButton> */}
        </IconButton>
        {/* ↓まとめる？まとめない？ */}
        {/* </Typography>
      <Typography variant="subtitle1" component="span" className={classes.icons}> */}
        {/* <SvgIcon
          fontSize="inherit" */}
        <IconButton
          onClick={() =>
            props.dispatchAppState({
              type: "OPEN_MODAL",
              payload: "select_tags",
            })
          }
          className={classes.icon}
        >
          <TagsButton />
          {/* </SvgIcon> */}
        </IconButton>
      </Typography>
      
      {props.showSelectedTags}

      {/* <Typography variant="subtitle1" component="span" className={classes.displayPage}>
        【 {props.paginationParams.page}/{props.paginationParams.pageCount} 】
      </Typography> */}
      <Typography
        variant="subtitle1"
        component="span"
        className={classes.paginationArrows}
      >
        <PaginationArrows {...props} classes={classes} />
      </Typography>
    </Grid>
  );
};

export const PPagination = () => {
  const props = usePPaginationProps()
  
  return <PPaginationPresenter {...props}/>
}