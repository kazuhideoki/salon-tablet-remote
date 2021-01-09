import React from "react";
import { Typography } from "@material-ui/core";

type Props = {
  className?: string;
  paginationParams: {
    page: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
  };
};

export const PageNumber = ({ className, paginationParams }: Props) => {
  return (
    <Typography variant="subtitle1" component="span" className={className}>
      【 {paginationParams.page}/{paginationParams.pageCount} 】
    </Typography>
  );
};
