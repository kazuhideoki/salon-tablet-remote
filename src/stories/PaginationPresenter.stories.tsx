import React from 'react';
import { PPaginationPresenter, TUsePPaginationProps } from '../app/View/Footer/PaginationBar/PPagination';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
import { sampleTags } from './lib/sampleTags';
import { withStyles, IconButton, MuiThemeProvider } from '@material-ui/core';
import { themeMinimal } from '../app/Store/themes/themeMinimal';
import { initInstagramMedias } from '../app/Store/Types';
import { minimal } from './lib/themeMinimal';
export default {
  title: "Footer/Pagination/PPagination",
  component: PPaginationPresenter,
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

const props: TUsePPaginationProps = {
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
    <MuiThemeProvider theme={minimal}>
      <PPaginationPresenter {...props} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </MuiThemeProvider>
  );
}
export const isTabletPortrait = () => {

  return (
    <MuiThemeProvider theme={minimal}>
      <PPaginationPresenter {...props} isTabletPortrait={true} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </MuiThemeProvider>
  );
}
const props2: TUsePPaginationProps = {
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
    <MuiThemeProvider theme={minimal}>
      <PPaginationPresenter {...props2} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </MuiThemeProvider>
  );
}