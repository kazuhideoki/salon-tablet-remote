import React from "react";
import { Button, Typography, IconButton } from "@material-ui/core";
import { TPaginationPropsAndClasses } from "../../view/PaginationBar";

type Props = {
  paginationParams: {
    page: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
  },
  handleOnNumClick: (num: any) => void,
  nums: string
  numsCurrent: string
}

export const DisplayNumbers:React.FC<TPaginationPropsAndClasses> = (props) => {
    const { page, pageCount } = props.paginationParams;

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
        <props.StyledIconButton
          key={num}
          className={`${props.classes.button} ${props.classes.selectedButton}`}
        >
          {num}
        </props.StyledIconButton>
      );
    }

    return (
      <props.StyledIconButton
        key={num}
        onClick={() => props.handleOnNumClick(num)}
        className={props.classes.button}
      >
        {/* <Typography variant='button' >
          {num}
        </Typography> */}
        {num}
      </props.StyledIconButton>
    );
  });

  return <>{nums}</>;
};
