import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { Store } from "../../../../Store/Store";
import { useGetArticles } from "../../../../ActionCreator/articles/useGetArticles";
import { Typography, SvgIcon } from "@material-ui/core";
import { TArrowProps } from "../PaginationArrows";


export const Next = (props: TArrowProps) => {
  const { page, pageCount, rowCount } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.paginationParams.page + 1);
  };

  let onClick;
  let disable;
  if (!(page === pageCount) && rowCount !== 0) {
    onClick = () => hundleOnClick();
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }

  return (      
    <SvgIcon fontSize="inherit" onClick={onClick}>
      <NavigateNext
        className={`${disable}`}
      />
    </SvgIcon>

  );
};


