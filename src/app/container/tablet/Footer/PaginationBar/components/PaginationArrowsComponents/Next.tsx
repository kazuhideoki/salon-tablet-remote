import React from 'react';
import { NavigateNext } from '@material-ui/icons';
import { PaginationPresenterPropsAndClasses } from '../../PaginationBar';

export const Next = (props: PaginationPresenterPropsAndClasses) => {
  const { page, pageCount, rowCount } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.page + 1);
  };

  let className;
  let onClick;
  let disabled;
  if (!(page === pageCount) && rowCount !== 0) {
    className = props.classes.button;
    onClick = () => hundleOnClick();
    disabled = false;
  } else {
    className = `${props.classes.button} ${props.classes.disabled}`;
    onClick = undefined;
    disabled = true;
  }

  return (
    <props.StyledIconButton
      className={className}
      onClick={onClick}
      disabled={disabled}>
      <NavigateNext />
    </props.StyledIconButton>
  );
};
