import React from "react";
import { FirstPage } from "@material-ui/icons";
import { Store } from "../../../../../../Store/Store";
import { useGetArticles } from "../../../../../../ActionCreator/articles/useGetArticles/useGetArticles";
import { Typography, SvgIcon, Button } from "@material-ui/core";
import { TPaginationPropsAndClasses } from "../../view/PaginationBar";

//  ページ数が3より大きい場合latestとoldestを表示
export const Latest:React.FC<TPaginationPropsAndClasses> = (props) => {

    const {page, pageCount} = props.paginationParams

    const hundleOnClick = () => {
      props.getArticles(props.isSetting, 1);
    };

    let className
    let onClick;
    let disabled;
    if (page > 3 && pageCount > 3) {
      className = props.classes.button
      onClick = () => hundleOnClick();
      disabled = false;
    } else {
      className = `${props.classes.button} ${props.classes.disabled}`;
      onClick = undefined;
      disabled = true
    }
    
    return (
      <props.StyledIconButton
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        <FirstPage />
      </props.StyledIconButton>
    );
};
