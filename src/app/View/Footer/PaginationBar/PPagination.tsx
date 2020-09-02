import React from "react";
import { Store } from "../../../Store/Store";
import { ThemeContext } from "../../../Store/ThemeContext";
import { Grid, makeStyles, createStyles, Theme, Typography, SvgIcon, Chip, IconButton, withStyles, useTheme, Card, useMediaQuery } from "@material-ui/core";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { HomeButton } from "./HomeButton";
import { PaginationArrows } from "./PaginationArrows";
import { TagsButton } from "./TagsButton";
import { useSelectedArticlesTagNames } from "../../../Store/useSelectedArticlesTagNames";
import { Instagram } from "@material-ui/icons";
import { PaginationInstagram } from "./PaginationInstagram";
import { useGetInstagramMedias } from "../../../ActionCreator/instagramMedias/useGetInstagramMedias";

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

  const isTabletPortrait = useMediaQuery("(max-width:800px)");

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
    isTabletPortrait,
    getInstagramMedias,
    instagramMedias,
  };
};
export type TUsePPaginationProps = ReturnType<typeof usePPaginationProps> & {
  className: string
};
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
    gridIcons: {
      marginLeft: "auto",
      display: 'flex',
      wrap: 'nowrap',
    },
    isTabletPortrait: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    item: {
      padding: 4,
    },
    gridPagination: {
      marginRight: "auto",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
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
      flexShrink: 1,
    },
    selectedTags: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      width: "fit-content",
      height: "100%",
    },

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
    <Card className={`${classes.root} ${props.className}`}>
      <Grid
        container
        spacing={1}
        wrap="nowrap"
        direction={props.isTabletPortrait ? "column" : undefined}
        className={`${classes.gridContainer}`}
      >
        <Grid
          item
          className={`${classes.gridIcons} ${
            props.isTabletPortrait ? classes.isTabletPortrait : ""
          }`}
        >
          <div className={classes.item}>
            <props.StyledIconButton
              className={` ${classes.button} ${props.isShowInstagram ===
                false && props.selectedTagNames.length === 0}`}
              onClick={() => props.getArticles(props.isSetting, 1, [])}
            >
              <HomeButton />
            </props.StyledIconButton>
          </div>

          {props.tags.length ? (
            <div className={classes.item}>
              <props.StyledIconButton
                className={
                  props.isShowInstagram === false &&
                  props.selectedTagNames.length
                    ? `${classes.button} ${classes.selectedButton}`
                    : classes.button
                }
                onClick={() =>
                  props.dispatchAppState({
                    type: "OPEN_MODAL",
                    payload: "select_tags",
                  })
                }
              >
                <TagsButton />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram === false &&
            props.selectedArticlesTags.length !== 0 && (
              <div className={classes.item}>
                <div
                  id="pagination_selectecd_tags_div"
                  className={`${classes.selectedTags}`}
                >
                  {props.selectedTagNames.map((value) => (
                    <Chip label={value} size="small" />
                  ))}
                </div>
              </div>
            )}

          {props.instagramAccounts.length ? (
            <div className={classes.item}>
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
              >
                <Instagram />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram && (
            <div className={classes.item}>
              <Chip
                label={props.selectedInstagramAccount.username}
                size="small"
              />
            </div>
          )}
        </Grid>

        <Grid
          item
          className={`${classes.gridPagination} ${
            props.isTabletPortrait ? classes.isTabletPortrait : ""
          }`}
        >
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

export const PPagination = ({className = ''}) => {
  const props = usePPaginationProps()
  
  return <PPaginationPresenter {...props} className={className}/>
}