import React from 'react';
import { PPaginationPresenter, TUsePPaginationProps } from '../app/View/Footer/Pagination/PPagination';
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
  selectedTagNames: ["カラー", "パーマ", "英語"],
  selectedInstagramAccount: null,
  isShowInstagram: false,
};

export const Normal = () => {

  return (
    <PPaginationPresenter {...props}/>
  )
}