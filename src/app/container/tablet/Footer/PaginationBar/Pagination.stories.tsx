import React from 'react';
import {
  PaginationBarPresenter,
  TUsePaginationBarProps,
} from './PaginationBar';
import { sampleInstagramAccounts } from '../../../../../util/dev/sampleInstagramAccounts';
import { sampleTags } from '../../../../../util/dev/sampleTags';
import { withStyles, IconButton } from '@material-ui/core';
import {
  InstagramMediaObject,
  InstagramMedias,
} from '../../../../../util/interface/Interface';
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
  instagramMediaObject: {} as InstagramMediaObject,
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
  instagramMediaObject: {
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
