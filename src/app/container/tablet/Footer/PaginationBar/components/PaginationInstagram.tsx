import React from 'react';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { PaginationPresenterPropsAndClasses } from '../PaginationBar';

export const PaginationInstagram: React.FC<PaginationPresenterPropsAndClasses> = (
  props
) => {
  const { cursors, next, previous } = props.instagramMediaObject.paging;

  return (
    <div>
      <props.StyledIconButton
        className={`${props.classes.button} ${
          previous || props.classes.disabled
        }`}
        onClick={
          previous
            ? () =>
                props.getInstagramMedias(
                  props.selectedInstagramAccount.id,
                  props.selectedInstagramAccount.username,
                  { before: cursors.before }
                )
            : undefined
        }>
        <NavigateBefore
          className={previous ? undefined : props.classes.disabled}
        />
      </props.StyledIconButton>
      <props.StyledIconButton
        className={`${props.classes.button} ${next || props.classes.disabled}`}
        onClick={
          next
            ? () =>
                props.getInstagramMedias(
                  props.selectedInstagramAccount.id,
                  props.selectedInstagramAccount.username,
                  { after: cursors.after }
                )
            : undefined
        }>
        <NavigateNext className={next ? undefined : props.classes.disabled} />
      </props.StyledIconButton>
    </div>
  );
};
