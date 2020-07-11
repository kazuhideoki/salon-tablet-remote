import React from 'react'
import { Store } from '../../../Store/Store';
import { Typography } from '@material-ui/core';

type Props = {
  className?: string
  paginationParams: {
    page: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
}
}

export const PageNumber = ({ className, paginationParams}: Props) => {

  return (
    <span className={className}>
      【 {paginationParams.page}/{paginationParams.pageCount} 】
    </span>
  );
};
