import React from 'react';
import { LastPage } from '@material-ui/icons';
import { SvgIcon, Button, IconButton } from '@material-ui/core';
import { TPaginationPropsAndClasses } from '../../PaginationBar';

//  ページ数が3より大きい場合latestとoldestを表示
export const Oldest = (props: TPaginationPropsAndClasses) => {
  const { page, pageCount } = props.paginationParams;

  const hundleOnClick = () => {
    props.getArticles(props.isSetting, props.paginationParams.pageCount);
  };

  let className;
  let onClick;
  let disabled;
  if (page < pageCount - 2 && pageCount > 3) {
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
      <LastPage />
    </props.StyledIconButton>
  );
};
