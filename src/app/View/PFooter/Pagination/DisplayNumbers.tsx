import React from "react";
import { Store } from "../../../Store/Store";
import { useStylesFactory } from "../../../Store/useStylesFactory";
import { ThemeType } from "../../../Store/ThemeContext";
import { pageArrowProps } from "./PPagination";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";

const styles = {
  nums: {
    fontSize: (themes: ThemeType) => themes.iconSmall * 0.7,
    border: "none",
    backgroundColor: "transparent",
    margin: "auto 10px",
    padding: 5
  },
  numsCurrent: {
    fontWeight: "bold"
  }
};

export const DisplayNumbers = (props: pageArrowProps) => {
    const classes = useStylesFactory(styles)
    const { paginationParams, dispatchAppState } = React.useContext(Store);
    const {page, pageCount} = paginationParams;
    const getArticles = useGetArticles();

    const hundleOnClick = (num) => {
      dispatchAppState({ type: "START_LOADING" });
      getArticles(num);
    };

    const number1 = page - 2;
    const number2 = page - 1;
    const number3 = page;
    const number4 = page + 1;
    const number5 = page + 2;

    const numbers = [number1, number2, number3, number4, number5];
  const nums = numbers.map(num => {
    if (num <= 0) {
      return "";
    } else if (num > pageCount) {
             return "";
           } else if (num === page) {
             return (
               <button
                 key={num}
                 className={`${classes.nums} ${classes.numsCurrent}`}
               >
                 {num}
               </button>
             );
           }

    return (
      <button
        key={num}
        onClick={() => hundleOnClick(num)}
        className={classes.nums}
      >
        {num}
      </button>
    );
  });

  return <>{nums}</>;
};
