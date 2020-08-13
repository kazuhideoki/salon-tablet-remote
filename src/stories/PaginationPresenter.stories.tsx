import React from 'react';
import { PPaginationPresenter, TUsePPaginationProps } from '../app/View/Footer/PaginationBar/PPagination';
import { sampleInstagramAccounts } from './sampleInstagramAccounts';
import { sampleTags } from './sampleTags';
import { withStyles, IconButton, MuiThemeProvider } from '@material-ui/core';
import { themeMinimal } from '../app/Store/themes/themeMinimal';
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
};

export const Normal = () => {
  const [isShowSelectedTags, setIsShowSelectedTags] = React.useState(false);

  return (
    <MuiThemeProvider theme={themeMinimal}>
      <PPaginationPresenter
        {...props}
        // isShowSelectedTags
        // setIsShowSelectedTags={setIsShowSelectedTags}
      />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </MuiThemeProvider>
  );
}