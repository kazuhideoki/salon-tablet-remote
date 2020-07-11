import React from 'react';
import { PPaginationPresenter } from '../app/View/PFooter/Pagination/PPagination';
export default {
  title: 'PPaginationPresenter',
  component: PPaginationPresenter,
};

const props = {
  getArticles: null,
  paginationParams: {
      page: 3,
      pageCount: 4,
      pageSize: 5,
      rowCount: 18,
  },
}

export const Normal = () => {

  return (
    <PPaginationPresenter {...props}/>
  )
}