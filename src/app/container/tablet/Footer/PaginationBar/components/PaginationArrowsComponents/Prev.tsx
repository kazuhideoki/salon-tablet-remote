import React from 'react';
import { NavigateBefore } from '@material-ui/icons';
import { TPaginationPropsAndClasses } from '../../PaginationBar';

export const Prev = (props: TPaginationPropsAndClasses) => {
  const { page } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.page - 1);
  };

  let className;
  let onClick;
  let disabled;
  if (!(page === 1)) {
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
      <NavigateBefore />
    </props.StyledIconButton>
  );
};
