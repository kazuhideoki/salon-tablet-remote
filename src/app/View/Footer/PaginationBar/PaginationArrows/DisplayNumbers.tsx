import React from "react";

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

export const DisplayNumbers = (props: Props) => {
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
        <button key={num} className={`${props.nums} ${props.numsCurrent}`}>
          {/* <Icon fontSize="inherit">{num}</Icon> */}
          {num}
        </button>
      );
    }

    return (
      <button
        key={num}
        onClick={() => props.handleOnNumClick(num)}
        className={props.nums}
      >

        {/* <Icon fontSize="inherit">{num}</Icon> */}
        {num}
      </button>
    );
  });

  return <>{nums}</>;
};
