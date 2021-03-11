import React from 'react';
import { PaginationPresenterPropsAndClasses } from '../../PaginationBar';

export const DisplayNumbers: React.FC<PaginationPresenterPropsAndClasses> = (
  props
) => {
  const { page, pageCount } = props.paginationParams;

  const number1 = page - 2;
  const number2 = page - 1;
  const number3 = page;
  const number4 = page + 1;
  const number5 = page + 2;

  const numbers = [number1, number2, number3, number4, number5];
  const nums = numbers.map((num, index) => {
    if (num <= 0) {
      return '';
    } else if (num > pageCount) {
      return '';
    } else if (num === page) {
      return (
        <props.StyledIconButton
          key={index}
          className={`${props.classes.button} ${props.classes.selectedButton}`}>
          {num}
        </props.StyledIconButton>
      );
    }

    return (
      <props.StyledIconButton
        key={index}
        onClick={() => props.handleOnNumClick(num)}
        className={props.classes.button}>
        {/* <Typography variant='button' >
          {num}
        </Typography> */}
        {num}
      </props.StyledIconButton>
    );
  });

  return <>{nums}</>;
};
