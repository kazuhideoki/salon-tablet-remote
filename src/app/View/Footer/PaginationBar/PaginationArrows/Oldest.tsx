import React from "react";
import { LastPage } from "@material-ui/icons";
import { SvgIcon } from "@material-ui/core";
import { TArrowProps } from "../PaginationArrows";

//  ページ数が3より大きい場合latestとoldestを表示
export const Oldest = (props: TArrowProps) => {
  const { page, pageCount } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.pageCount);
  };

  let onClick;
  let disable;
  if (page < pageCount - 2 && pageCount > 3) {
    onClick = () => hundleOnClick();
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <SvgIcon fontSize="inherit" onClick={onClick}>
      <LastPage
        className={`${disable}`}
      />
    </SvgIcon>
  );
};
