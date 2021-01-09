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
        disableRipple={previous ? false : true}
        className={`${props.classes.button} ${
          previous || props.classes.disabled
        }`}
        onClick={
          previous
            ? () =>
                props.getInstagramMedias({
                  instagram_id: props.selectedInstagramAccount.id,
                  username: props.selectedInstagramAccount.username,
                  paging: { after: '', before: cursors.before },
                })
            : undefined
        }>
        <NavigateBefore
          className={previous ? undefined : props.classes.disabled}
        />
      </props.StyledIconButton>
      <props.StyledIconButton
        disableRipple={next ? false : true}
        className={`${props.classes.button} ${next || props.classes.disabled}`}
        onClick={
          next
            ? () =>
                props.getInstagramMedias({
                  instagram_id: props.selectedInstagramAccount.id,
                  username: props.selectedInstagramAccount.username,
                  paging: { after: cursors.after, before: '' },
                })
            : undefined
        }>
        <NavigateNext className={next ? undefined : props.classes.disabled} />
      </props.StyledIconButton>
    </div>
  );
};
