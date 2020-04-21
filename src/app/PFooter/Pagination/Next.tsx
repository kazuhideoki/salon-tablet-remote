import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";


export const Next = (props: pageArrowProps) => {
  const { paginationParams, totalPages } = React.useContext(Store);
  const currentPage = paginationParams.currentPage;

  const arg: PaginationParamsAction = { type: "NEXT" };
  let onClick;
  let disable;
  if (!(currentPage === totalPages)) {
    onClick = () => props.setParams(arg);
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <NavigateNext
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
