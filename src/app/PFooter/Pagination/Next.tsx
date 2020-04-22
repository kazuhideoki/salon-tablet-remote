import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";


export const Next = (props: pageArrowProps) => {
  const { paginationParams } = React.useContext(Store);
  const {currentPage, pageCount} = paginationParams

  let onClick;
  let disable;
  if (!(currentPage === pageCount)) {
    onClick = () => props.setParams({ type: "NEXT" });
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
