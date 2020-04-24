import React from "react";
import { LastPage } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParams/paginationParamsReducer";

//  ページ数が3より大きい場合latestとoldestを表示
export const Oldest = (props: pageArrowProps) => {
  const { paginationParams } = React.useContext(Store);
  const {page, pageCount} = paginationParams;

  let onClick;
  let disable;
  if (page < pageCount - 2 && pageCount > 3) {
    onClick = () =>
      props.hundleOnClick({ type: "OLDEST", payload: pageCount });
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <LastPage onClick={onClick} className={`${props.classesIcon} ${disable}`} />
  );
};
