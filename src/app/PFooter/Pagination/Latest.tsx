import React from "react";
import { FirstPage } from "@material-ui/icons";
import { pageArrowProps } from "./PPagination";
import { Store } from "../../Store/Store";
import { useGetPost } from "../../Store/articles/articlesActionCreator";


//  ページ数が3より大きい場合latestとoldestを表示
export const Latest = (props: pageArrowProps) => {
    const { dispatchAppState, paginationParams } = React.useContext(Store);
    const {page, pageCount} = paginationParams
    const getPost = useGetPost()

    const hundleOnClick = () => {
      dispatchAppState({ type: "START_LOADING" });
      getPost(1);
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
        <FirstPage
            onClick={onClick}
            className={`${props.classesIcon} ${disable}`}
        />
    );
};
