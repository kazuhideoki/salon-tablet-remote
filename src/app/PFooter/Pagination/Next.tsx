import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";
import { useGetPost } from "../../Store/postData/postDataActionCreator";


export const Next = (props: pageArrowProps) => {
  const { paginationParams } = React.useContext(Store);
  const { page, pageCount, rawCount } = paginationParams;
  const getPost = useGetPost()

  let onClick;
  let disable;
  if (!(page === pageCount) && rawCount !== 0) { 
    onClick = () => props.hundleOnClick({ type: "NEXT" });
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
