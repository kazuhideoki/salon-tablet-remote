import React from "react";
import { Store } from "../../../Store/Store";
import { ThemeContext } from "../../../Store/ThemeContext";
import { pageArrowProps } from "./PPagination";
import { useGetArticles } from "../../../ActionCreator/articles/useGetArticles";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { LoadingAction } from "../../../Reducer/loadingReducer";

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    nums: {
      fontSize: themes.iconSmall * 0.7,
      border: "none",
      backgroundColor: "transparent",
      margin: "auto 10px",
      padding: 5
    },
    numsCurrent: {
      fontWeight: "bold"
    }
  })
})

type Props = {
  paginationParams: {
    page: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
  },
  hundleOnNumClick: (num: any) => void,
}

export const DisplayNumbers = (props: Props) => {
    const classes = useStyles()  

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
                 {/* <Typography variant="subtitle1"> */}
                  {num}
                 {/* </Typography> */}
               </button>
             );
           }

    return (
      <button
        key={num}
        onClick={() => hundleOnNumClick(num)}
        className={classes.nums}
      >
        {/* <Typography variant="subtitle1"> */}
        {num}
        {/* </Typography> */}
      </button>
    );
  });

  return <>{nums}</>;
};
