import React from 'react';
import { PaginationBarPresenter, TUsePaginationBarProps } from '../app/View/Footer/PaginationBar/view/PaginationBar';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
import { sampleTags } from './lib/sampleTags';
import { withStyles, IconButton, MuiThemeProvider } from '@material-ui/core';
import { initInstagramMedias } from '../app/Store/Types';
export default {
  title: "Footer/Pagination/PaginationBar",
  component: PaginationBarPresenter,
};

const StyledIconButton = withStyles({
  root: {
    margin: 8,
    // border: "1px solid",
  },
  label: {
    width: "1rem",
    height: "1rem",
  },
})(IconButton);

const props: TUsePaginationBarProps = {
  isSetting: true,
  getArticles: null,
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },

  dispatchAppState: null,
  handleOnNumClick: null,
  selectedTagNames: ["カラー", "パーマ", "英語"],
  selectedInstagramAccount: null,
  isShowInstagram: false,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [1],
  StyledIconButton,
  getInstagramMedias: null,
  instagramMedias: null,
  isTabletPortrait: false,
};

export const Normal = () => {

  return (
    <>
      <PaginationBarPresenter {...props} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
      </>
  );
}
export const isTabletPortrait = () => {

  return (
    <>
      <PaginationBarPresenter {...props} isTabletPortrait={true} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
      </>
  );
}
const props2: TUsePaginationBarProps = {
  isSetting: true,
  getArticles: null,
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },

  dispatchAppState: null,
  handleOnNumClick: null,
  selectedTagNames: ["カラー", "パーマ", "英語"],
  selectedInstagramAccount: {
    id: 0,
    username: "instagramさん",
  },
  isShowInstagram: true,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [1],
  StyledIconButton,
  getInstagramMedias: null,
  instagramMedias: {
    data: [],
    paging: {
        cursors: {
            before: 'string',
            after: 'string',
        },
        next: "string",
    },
  },
  isTabletPortrait: false,
};

export const Instagram表示 = () => {

  return (
    <>
      <PaginationBarPresenter {...props2} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </>
  );
}