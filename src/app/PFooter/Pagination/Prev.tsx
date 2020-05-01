import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../Store/Store";
import { useGetPost } from "../../Store/postData/postDataActionCreator";

export const Prev = (props: pageArrowProps) => {
  const { paginationParams, dispatchAppState } = React.useContext(Store);
  const { page } = paginationParams;
  const getPost = useGetPost();

  const hundleOnClick = () => {
    dispatchAppState({ type: "START_LOADING" });
    getPost(page - 1);
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
    <NavigateBefore
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
