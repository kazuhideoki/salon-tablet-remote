import React from "react";
import { LastPage } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../../Store/Store";
import { PaginationParamsAction } from "../../../Reducer/paginationParamsReducer";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";

//  ページ数が3より大きい場合latestとoldestを表示
export const Oldest = (props: pageArrowProps) => {
  const { paginationParams, dispatchLoading } = React.useContext(Store);
  const {page, pageCount} = paginationParams;
  const getArticles = useGetArticles();

  const hundleOnClick = () => {
   dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
    getArticles(pageCount);
  };

  let onClick;
  let disable;
  if (page < pageCount - 2 && pageCount > 3) {
    onClick = () => hundleOnClick();
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <LastPage onClick={onClick} className={`${props.classesIcon} ${disable}`} />
  );
};
