import React from "react";
import { Store } from "../../../Store/Store";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography, SvgIcon, Chip, IconButton, withStyles, useTheme, Card } from "@material-ui/core";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PaginationArrows } from "./PaginationArrows";
import { TagsButton } from "./TagsButton";
import { useSelectedArticlesTagNames } from "../../../Store/useSelectedArticlesTagNames";
import { Instagram } from "@material-ui/icons";
import { PaginationInstagram } from "./PaginationInstagram";
import { useGetInstagramMedias } from "../../../ActionCreator/instagramMedias/useGetInstagramMedias";

// const gridSelectedTagsWidth = 100;

export const usePPaginationProps = () => {
  const getArticles = useGetArticles();
  const { dispatchAppState, appState} = React.useContext(Store);
  const {
    isSetting,
    tags,
    instagramAccounts,
    instagramMedias,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  } = appState;
  const {  } = appState
  const getInstagramMedias = useGetInstagramMedias();
  
  const handleOnNumClick = (num) => {
    getArticles(isSetting, num);
  };

  const selectedTagNames = useSelectedArticlesTagNames();

  const theme = useTheme()
  const StyledIconButton = withStyles({
    root: {
      margin: theme.spacing(1),
    },
    label: {
      width: "1rem",
      height: "1rem",
    },
  })(IconButton);

  return {
    StyledIconButton,
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
    selectedArticlesTags,

    getInstagramMedias,
    instagramMedias,
  };
};
export type TUsePPaginationProps = ReturnType<typeof usePPaginationProps>

export type TPaginationPropsAndClasses = TUsePPaginationProps & {
  classes: TPPaginationClasses;
};

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      borderRadius: 0,
      width: "100%",
    },
    gridContainer: {
      overflowX: "scroll",
      width: "100%",
    },
    gridHome: {
      marginLeft: "auto",
    },
    gridPagination: {
      marginRight: "auto",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      // width: 400,
      alignItems: "center",
    },

    icons: {
      fontSize: "inherit",
    },

    button: {
      border: "1px solid",
    },
    selectedButton: {
      fontWeight: "bold",
      color: theme.palette.secondary.main,
    },
    disabled: {
      color: theme.palette.text.disabled,
      border: "none",
    },
    girdSelectedTags: {
      overflowX: "scroll",
      overflowY: "hidden",
      // minWidth: gridSelectedTagsWidth,
      flexShrink: 1,
    },
    selectedTags: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      width: "fit-content",
      height: "100%",
    },
    // selectedTagsAnimation: {
    //   animation: "$infinity-loop 4s infinite linear 1s both",
    // },
    // "@keyframes infinity-loop": {
    //   from: {
    //     transform: "translateX(0px)",
    //   },
    //   to: {
    //     transform: "translateX(-100px)",
    //   },
    // },

    instagramAccount: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
    },
  });
})

export type TPPaginationClasses = ReturnType<typeof useStyles>

export const PPaginationPresenter: React.FC<TUsePPaginationProps> = (props) => {

  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <Grid
        container
        // justify="center"
        spacing={1}
        wrap="nowrap"
        className={classes.gridContainer}
      >
        <Grid item className={classes.gridHome}>
          <props.StyledIconButton
            className={
              props.isShowInstagram === false &&
              props.selectedTagNames.length === 0
                ? `${classes.button} ${classes.selectedButton}`
                : classes.button
            }
            onClick={() => props.getArticles(props.isSetting, 1, [])}
            // color={
            //   props.isShowInstagram === false &&
            //   props.selectedTagNames.length === 0
            //     ? "secondary"
            //     : "default"
            // }
          >
            <HomeButton />
          </props.StyledIconButton>
        </Grid>

        {props.tags.length ? (
          <Grid item>
            <props.StyledIconButton
              className={
                props.isShowInstagram === false && props.selectedTagNames.length
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() =>
                props.dispatchAppState({
                  type: "OPEN_MODAL",
                  payload: "select_tags",
                })
              }
              // color={
              //   props.isShowInstagram === false && props.selectedTagNames.length
              //     ? "secondary"
              //     : "default"
              // }
            >
              <TagsButton />
            </props.StyledIconButton>
          </Grid>
        ) : null}

        {props.isShowInstagram === false &&
          props.selectedArticlesTags.length !== 0 && (
            <Grid item className={classes.girdSelectedTags}>
              {/* {props.isShowSelectedTags && ( */}
                <div
                  id="pagination_selectecd_tags_div" 
                  className={`${classes.selectedTags}`}
                >
                  {props.selectedTagNames.map((value) => (
                    <Chip label={value} size="small" />
                  ))}
                </div>
            </Grid>
          )}

        {props.instagramAccounts.length ? (
          <Grid item>
            <props.StyledIconButton
              className={
                props.isShowInstagram
                  ? `${classes.button} ${classes.selectedButton}`
                  : classes.button
              }
              onClick={() =>
                props.dispatchAppState({
                  type: "OPEN_MODAL",
                  payload: "select_instagram",
                })
              }
              // color={props.isShowInstagram ? "primary" : "default"}
            >
              <Instagram />
            </props.StyledIconButton>
          </Grid>
        ) : null}

        {props.isShowInstagram && (
          <Grid item className={classes.instagramAccount}>
            <Chip
              label={props.selectedInstagramAccount.username}
              size="small"
            />
          </Grid>
        )}

        <Grid item className={classes.gridPagination}>
          {props.isShowInstagram ? (
            <PaginationInstagram {...props} classes={classes} />
          ) : (
            <PaginationArrows {...props} classes={classes} />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export const PPagination = () => {
  const props = usePPaginationProps()
  
  return <PPaginationPresenter {...props}/>
}