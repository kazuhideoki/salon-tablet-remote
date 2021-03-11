import {
  IconButton,
  withStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useSelectedArticlesTagNames } from './context/useSelectedArticlesTagNames';
import { useHandleOnNumClick } from './context/useHandleOnNumClick';
import { useManageInstagramAccountsProps } from '../../Drawer/ManageInstagramAccounts/useManageInstagramAccounts';
import { useStatePaginationBar } from './context/useStatePaginationBar';
import { useDrawerProps } from '../../Drawer/Drawer/useDrawerPops';
import { useGetArticles } from '../../../../hooks/articles/useGetArticles';

export const usePaginationBarProps = () => {
  const {
    dispatchAppState,
    isSetting,
    tags,
    instagramAccounts,
    instagramMediaObject,
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
    instagramMediaObject,
    openModal,
  };
};
export type PaginationBarPresenterProps = ReturnType<
  typeof usePaginationBarProps
> & {
  className?: string;
};
