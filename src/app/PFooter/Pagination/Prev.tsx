import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../Store/Store";
import { useGetArticle } from "../../Store/articles/articlesActionCreator";

export const Prev = (props: pageArrowProps) => {
  const { paginationParams, dispatchAppState } = React.useContext(Store);
  const { page } = paginationParams;
  const getArticle = useGetArticle();

  const hundleOnClick = () => {
    dispatchAppState({ type: "START_LOADING" });
    getArticle(page - 1);
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
