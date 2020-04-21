import React from "react";
import { FirstPage } from "@material-ui/icons";
import { pageArrowProps } from "./Pagination";
import { Store } from "../../Store/Store";
import { PaginationParamsAction } from "../../Store/paginationParamsReducer";


//  ページ数が3より大きい場合latestとoldestを表示
export const Latest = (props: pageArrowProps) => {
    const { paginationParams, totalPages } = React.useContext(Store);
    const currentPage = paginationParams.currentPage;

    const arg: PaginationParamsAction = { type: "LATEST" };
    let onClick;
    let disable;
    if (currentPage > 3 && totalPages > 3) {
        onClick = () => props.setParams(arg);
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
