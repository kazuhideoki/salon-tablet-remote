import React from 'react';
import { PPaginationPresenter, TUsePPaginationProps } from '../app/View/Footer/Pagination/PPagination';
import { selectedTagIdsToName } from '../app/View/Footer/Pagination/selectedTagIdsToName';
import { Chip } from '@material-ui/core';
export default {
  title: "Footer/Pagination/PPagination",
  component: PPaginationPresenter,
};

const props: TUsePPaginationProps = {
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
  showSelectedTags: () => (
    <div>
      <Chip label='たぐだよ' size="small" />
      <Chip label='tags' size="small" />
      <Chip label='タグだヨ' size="small" />
    </div>
  ),
};

export const Normal = () => {

  return (
    <PPaginationPresenter {...props}/>
  )
}