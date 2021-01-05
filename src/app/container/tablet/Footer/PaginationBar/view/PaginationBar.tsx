import React from 'react';
import { ThemeContext } from '../../../../../Store/theme/ThemeProvider';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  IconButton,
  withStyles,
  useTheme,
  Card,
  useMediaQuery,
} from '@material-ui/core';
import { useGetArticles } from '../../../../../hooks/articles/useGetArticles';
import { HomeButton } from '../components/HomeButton';
import { PaginationArrows } from '../components/PaginationArrows';
import { TagsButton } from '../components/TagsButton';
import { useSelectedArticlesTagNames } from '../context/useSelectedArticlesTagNames';
import { Instagram } from '@material-ui/icons';
import { PaginationInstagram } from '../components/PaginationInstagram';
import { useHandleOnNumClick } from '../context/useHandleOnNumClick';
import { useManageInstagramAccountsProps } from '../../../Drawer/ManageInstagramAccounts/ManageInstagmaAccounts';
import { useStatePaginationBar } from '../context/useStatePaginationBar';
import { useDrawerProps } from '../../../Drawer/Drawer/Drawer';

export const usePaginationBarProps = () => {
  const {
    dispatchAppState,
    isSetting,
    tags,
    instagramAccounts,
    instagramMedias,
    paginationParams,
    selectedArticlesTags,
    selectedInstagramAccount,
    isShowInstagram,
  } = useStatePaginationBar();

  const getArticles = useGetArticles();

  const theme = useTheme();

  const { getInstagramMedias } = useManageInstagramAccountsProps();

  const handleOnNumClick = useHandleOnNumClick();

  const selectedTagNames = useSelectedArticlesTagNames();

  const { openModal } = useDrawerProps();

  const StyledIconButton = withStyles({
    root: {
      margin: theme.spacing(1),
    },
    label: {
      width: '1rem',
      height: '1rem',
    },
  })(IconButton);

  const isTabletPortrait = useMediaQuery('(max-width:800px)');

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
    openModal,
  };
};
export type TUsePaginationBarProps = ReturnType<
  typeof usePaginationBarProps
> & {
  className?: string;
};
export type TPaginationPropsAndClasses = TUsePaginationBarProps & {
  classes: TPaginationBarClasses;
};

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      borderRadius: 0,
      width: '100%',
    },
    gridContainer: {
      overflowX: 'scroll',
      width: '100%',
    },
    gridIcons: {
      marginLeft: 'auto',
      display: 'flex',
      wrap: 'nowrap',
    },
    isTabletPortrait: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    item: {
      padding: 4,
    },
    gridPagination: {
      marginRight: 'auto',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    icons: {
      fontSize: 'inherit',
    },

    button: {
      border: '1px solid',
    },
    selectedButton: {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
    },
    disabled: {
      color: theme.palette.text.disabled,
      border: 'none',
    },
    girdSelectedTags: {
      overflowX: 'scroll',
      overflowY: 'hidden',
      flexShrink: 1,
    },
    selectedTags: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: 'fit-content',
      height: '100%',
    },

    instagramAccount: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
  });
});

export type TPaginationBarClasses = ReturnType<typeof useStyles>;

export const PaginationBarPresenter: React.FC<TUsePaginationBarProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${props.className}`}>
      <Grid
        container
        spacing={1}
        wrap="nowrap"
        direction={props.isTabletPortrait ? 'column' : undefined}
        className={`${classes.gridContainer}`}>
        <Grid
          item
          className={`${classes.gridIcons} ${
            props.isTabletPortrait ? classes.isTabletPortrait : ''
          }`}>
          <div className={classes.item}>
            <props.StyledIconButton
              className={` ${classes.button} ${
                props.isShowInstagram === false &&
                props.selectedTagNames.length === 0
              }`}
              onClick={() => props.getArticles(props.isSetting, 1, [])}>
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
                onClick={() => props.openModal('select_tags')}>
                <TagsButton />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram === false &&
            props.selectedArticlesTags.length !== 0 && (
              <div className={classes.item}>
                <div
                  id="pagination_selected_tags_div"
                  className={`${classes.selectedTags}`}>
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
                onClick={() => props.openModal('select_instagram')}>
                <Instagram />
              </props.StyledIconButton>
            </div>
          ) : null}

          {props.isShowInstagram && (
            <div className={`${classes.item} ${classes.instagramAccount}`}>
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
            props.isTabletPortrait ? classes.isTabletPortrait : ''
          }`}>
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

export const PaginationBar = ({ className = '' }) => {
  const props = usePaginationBarProps();

  return <PaginationBarPresenter {...props} className={className} />;
};
