import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";

export const Prev = (props: pageArrowProps) => {
  const { paginationParams } = React.useContext(Store);
  const { page } = paginationParams;

  const arg: PaginationParamsAction = { type: "PREV" };
  let onClick;
  let disable;
  if (!(page === 1)) {
    onClick = () => props.hundleOnClick(arg);
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <NavigateBefore
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
