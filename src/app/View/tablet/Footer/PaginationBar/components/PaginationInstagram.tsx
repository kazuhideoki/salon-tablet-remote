import React from 'react'
import { createStyles,makeStyles,Theme } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { TPaginationPropsAndClasses } from '../view/PaginationBar';

export const PaginationInstagram:React.FC<TPaginationPropsAndClasses> = (props) => {

  const { cursors, next, previous} = props.instagramMedias.paging

  return (
    <div>
      <props.StyledIconButton
        className={`${props.classes.button} ${previous ||
          props.classes.disabled}`}
        onClick={
          previous
            ? () =>
                props.getInstagramMedias(
                  props.selectedInstagramAccount.id,
                  props.selectedInstagramAccount.username,
                  { before: cursors.before }
                )
            : null
        }
      >
        <NavigateBefore className={previous ? null : props.classes.disabled} />
      </props.StyledIconButton>
      <props.StyledIconButton
        className={`${props.classes.button} ${next ||
          props.classes.disabled}`}
        onClick={
          next
            ? () =>
                props.getInstagramMedias(
                  props.selectedInstagramAccount.id,
                  props.selectedInstagramAccount.username,
                  { after: cursors.after }
                )
            : null
        }
      >
        <NavigateNext className={next ? null : props.classes.disabled} />
      </props.StyledIconButton>
    </div>
  );
}
