import React from 'react';
import { PaginationMobilePresenter } from '../app/View/mobile/PaginationMobile';
import { sampleInstagramAccounts } from './sampleInstagramAccounts';
import { sampleTags } from './sampleTags';
import { IconButton, withStyles } from '@material-ui/core';
export default {
  title: "mobile/PaginationMobile",
  component: PaginationMobilePresenter,
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

const props = {
  isSetting: false,
  getArticles: null,
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },
  dispatchLoading: null,
  dispatchAppState: null,
  handleOnNumClick: null,
  selectedTagNames: ["英語", "ヘアケア", "商品"],
  selectedInstagramAccount: null,
  isShowInstagram: false,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [3],
  StyledIconButton,
  getInstagramMedias: null,
  instagramMedias: null,
};

export const Normal = () => {

  return (
    <>
      <PaginationMobilePresenter
        {...props}
      />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </>
  );
}