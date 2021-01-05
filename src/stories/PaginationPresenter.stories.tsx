import React from 'react';
import {
  PaginationBarPresenter,
  TUsePaginationBarProps,
} from '../app/container/tablet/Footer/PaginationBar/PaginationBar';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
import { sampleTags } from './lib/sampleTags';
import { withStyles, IconButton } from '@material-ui/core';
import { TInstagramMedias } from '../app/Store/Interface';
export default {
  title: 'Footer/Pagination/PaginationBar',
  component: PaginationBarPresenter,
};

const StyledIconButton = withStyles({
  root: {
    margin: 8,
  },
  label: {
    width: '1rem',
    height: '1rem',
  },
})(IconButton);

const props: TUsePaginationBarProps = {
  isSetting: true,
  getArticles: async () => {
    return true;
  },
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },

  dispatchAppState: () => {
    return;
  },
  handleOnNumClick: () => {
    return;
  },
  selectedTagNames: ['カラー', 'パーマ', '英語'],
  selectedInstagramAccount: { id: 0, username: 'example' },
  isShowInstagram: false,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [1],
  StyledIconButton,
  getInstagramMedias: async () => {
    return;
  },
  instagramMedias: {} as TInstagramMedias,
  isTabletPortrait: false,
  openModal: () => {
    return;
  },
};

export const Normal = () => {
  return (
    <>
      <PaginationBarPresenter {...props} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </>
  );
};
export const isTabletPortrait = () => {
  return (
    <>
      <PaginationBarPresenter {...props} isTabletPortrait={true} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </>
  );
};
const props2: TUsePaginationBarProps = {
  isSetting: true,
  getArticles: async () => {
    return true;
  },
  paginationParams: {
    page: 3,
    pageCount: 4,
    pageSize: 5,
    rowCount: 18,
  },

  dispatchAppState: () => {
    return;
  },
  handleOnNumClick: () => {
    return;
  },
  selectedTagNames: ['カラー', 'パーマ', '英語'],
  selectedInstagramAccount: {
    id: 0,
    username: 'instagramさん',
  },
  isShowInstagram: true,
  tags: sampleTags,
  instagramAccounts: sampleInstagramAccounts,
  selectedArticlesTags: [1],
  StyledIconButton,
  getInstagramMedias: async () => {
    return;
  },
  instagramMedias: {
    data: [],
    paging: {
      cursors: {
        before: 'string',
        after: 'string',
      },
      next: 'string',
    },
  },
  isTabletPortrait: false,
  openModal: () => {
    return;
  },
};

export const Instagram表示 = () => {
  return (
    <>
      <PaginationBarPresenter {...props2} />
      ※StyledIconButtonはpropsなので変更を反映させるためにはstoriesも変える必要あり
    </>
  );
};
