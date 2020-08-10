import React from "react";
import { Store } from "../../../Store/Store";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography, SvgIcon, Chip, IconButton } from "@material-ui/core";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PaginationArrows } from "./PaginationArrows";
import { TagsButton } from "./TagsButton";
import { useSelectedArticlesTagNames } from "../../../Store/useSelectedArticlesTagNames";
import { Instagram } from "@material-ui/icons";
import { PaginationInstagram } from "./PaginationInstagram";

export const usePPaginationProps = () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState} = React.useContext(Store);
  const { isSetting, tags, instagramAccounts, paginationParams } = appState;
  const { selectedInstagramAccount, isShowInstagram } = appState
  
  const handleOnNumClick = (num) => {
    getArticles(isSetting, num);
  };

  const selectedTagNames = useSelectedArticlesTagNames();

  return {
    tags,
    instagramAccounts,
    isSetting,
    getArticles,
    paginationParams,
    dispatchAppState,
    handleOnNumClick,
    selectedTagNames,
    selectedInstagramAccount,
    isShowInstagram,
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
      <IconButton
        onClick={() => props.getArticles(props.isSetting, 1, [])}
        className={classes.icon}
        color={
          props.isShowInstagram === false && props.selectedTagNames.length === 0
            ? "secondary"
            : "default"
        }
      >
        <HomeButton />
      </IconButton>

      {props.tags.length ? (
        <IconButton
          onClick={() =>
            props.dispatchAppState({
              type: "OPEN_MODAL",
              payload: "select_tags",
            })
          }
          color={
            props.isShowInstagram === false && props.selectedTagNames.length
              ? "secondary"
              : "default"
          }
          className={classes.icon}
        >
          <TagsButton />
        </IconButton>
      ) : null}

      <div>
        {props.isShowInstagram === false &&
          props.selectedTagNames.map((value) => (
            <Chip label={value} size="small" />
          ))}
      </div>

      {props.instagramAccounts.length ? (
        <IconButton
          onClick={() =>
            props.dispatchAppState({
              type: "OPEN_MODAL",
              payload: "select_instagram",
            })
          }
          className={classes.icon}
          color={props.isShowInstagram ? "primary" : "default"}
        >
          <Instagram />
        </IconButton>
      ) : null}

      <div>
        {props.isShowInstagram && (
          <Chip label={props.selectedInstagramAccount.username} size="small" />
        )}
      </div>

      <Typography
        variant="subtitle1"
        component="div"
        className={classes.paginationArrows}
      >
        {props.isShowInstagram ? (
          <PaginationInstagram {...props} classes={classes} />
        ) : (
          <PaginationArrows {...props} classes={classes} />
        )}
      </Typography>
    </Grid>
  );
};

export const PPagination = () => {
  const props = usePPaginationProps()
  
  return <PPaginationPresenter {...props}/>
}