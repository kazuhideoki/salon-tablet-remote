import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParams/paginationParamsReducer";

export const Prev = (props: pageArrowProps) => {
  const { paginationParams } = React.useContext(Store);
  const { page } = paginationParams;

  let onClick;
  let disable;
  if (!(page === 1)) {
    onClick = () => props.hundleOnClick({ type: "PREV" });
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
