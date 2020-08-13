import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { Store } from "../../../../Store/Store";
import { useGetArticles } from "../../../../ActionCreator/articles/useGetArticles";
import { Typography, SvgIcon, Button } from "@material-ui/core";
import { TPaginationPropsAndClasses } from "../PPagination";


export const Next = (props: TPaginationPropsAndClasses) => {
  const { page, pageCount, rowCount } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.page + 1);
  };

  let className
  let onClick;
  let disabled;
  if (!(page === pageCount) && rowCount !== 0) {
    className = props.classes.button;
    onClick = () => hundleOnClick();
    disabled = false;
  } else {
    className = `${props.classes.button} ${props.classes.disabled}`;
    onClick = undefined;
    disabled = true;
  }

  return (
    <props.StyledIconButton
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <NavigateNext />
    </props.StyledIconButton>
  );
};


