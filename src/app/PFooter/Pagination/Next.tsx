import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { useGetPost } from "../../Store/postData/postDataActionCreator";


export const Next = (props: pageArrowProps) => {
  const { paginationParams, dispatchAppState } = React.useContext(Store);
  const { page, pageCount, rowCount } = paginationParams;
  const getPost = useGetPost()

  const hundleOnClick = () => {
      dispatchAppState({ type: "START_LOADING" });
      getPost(page + 1)
  }

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
    <NavigateNext
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
