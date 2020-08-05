import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { Store } from "../../../../Store/Store";
import { useGetArticles } from "../../../../ActionCreator/articles/useGetArticles";
import { Typography, SvgIcon } from "@material-ui/core";
import { TArrowProps } from "../PaginationArrows";

export const Prev = (props: TArrowProps) => {
  const { page } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.page - 1);
  };

  let onClick;
  let disable;
  if (!(page === 1)) {
    onClick = () => hundleOnClick();
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <SvgIcon fontSize="inherit" onClick={onClick}>
      <NavigateBefore className={`${disable}`} />
    </SvgIcon>
  );
};

