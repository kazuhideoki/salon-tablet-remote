import React from "react";
import { FirstPage } from "@material-ui/icons";
import { Store } from "../../../Store/Store";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { Typography, SvgIcon } from "@material-ui/core";
import { TArrowProps } from "./PaginationArrows";

//  ページ数が3より大きい場合latestとoldestを表示
export const Latest = (props: TArrowProps) => {
    const {page, pageCount} = props.paginationParams

    const hundleOnClick = () => {
      props.dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
      props.getArticles(1);
    };

    let onClick;
    let disable;
    if (page > 3 && pageCount > 3) {
      onClick = () => hundleOnClick();
      disable = null;
    } else {
      onClick = undefined;
      disable = props.classesDisable;
    }
    
    return (
      <SvgIcon fontSize="inherit" onClick={onClick}>
        <FirstPage className={`${disable}`} />
      </SvgIcon>
    );
};

// export const Latest = ({classesDisable}) => {
//   const props = usePPaginationProps()

//   const hundleOnClick = () => {
//     props.dispatchLoading({ type: "ON_IS_LOADING_MAIN_ARTICLES" });
//     props.getArticles(1);
//   };

//   return (
//     <LatestPresenter
//       hundleOnClick={hundleOnClick}
//       classesDisable={classesDisable}
//       {...props}
//     />
//   );
// }
