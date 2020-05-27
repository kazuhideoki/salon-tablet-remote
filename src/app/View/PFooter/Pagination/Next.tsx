import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../../Store/Store";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";


export const Next = (props: pageArrowProps) => {
  const { paginationParams, dispatchLoading } = React.useContext(Store);
  const { page, pageCount, rowCount } = paginationParams;
  const getArticles = useGetArticles();

  const hundleOnClick = () => {
      dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
      getArticles(page + 1);
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
