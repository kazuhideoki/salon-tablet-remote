import React from 'react';
import { PaginationMobilePresenter } from '../app/View/mobile/PaginationMobile';
export default {
  title: 'PaginationMobilePresenter',
  component: PaginationMobilePresenter,
};

const props = {
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
};

export const Normal = () => {

  return (
    <PaginationMobilePresenter {...props}/>
  )
}