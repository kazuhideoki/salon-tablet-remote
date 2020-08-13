import React from 'react'
import { SvgIcon, createStyles,makeStyles,Theme } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Store } from '../../../Store/Store';
import { useGetInstagramMedias } from '../../../ActionCreator/instagramMedias/useGetInstagramMedias';
import { TPaginationPropsAndClasses } from './PPagination';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
    },
  });
})

export const PaginationInstagram:React.FC<TPaginationPropsAndClasses> = (props) => {

  const { appState } = React.useContext(Store)
  const { instagramMedias } = appState
  const getInstagramMedias = useGetInstagramMedias()
  const { cursors, next, previous} = instagramMedias.paging

  // 最初か最後のページでdisable
  // ページ送りがある場合 nextやpreviousが入る。(https〜のget)

  return (
    <div >
      <props.StyledIconButton
        className={props.classes.button}
        onClick={
          previous
            ? () =>
                getInstagramMedias(
                  appState.selectedInstagramAccount.id,
                  appState.selectedInstagramAccount.username,
                  { before: cursors.before }
                )
            : null
        }
      >
        <NavigateBefore className={previous ? null : props.classes.disabled} />
      </props.StyledIconButton>
      <props.StyledIconButton
        className={props.classes.button}
        onClick={
          next
            ? () =>
                getInstagramMedias(
                  appState.selectedInstagramAccount.id,
                  appState.selectedInstagramAccount.username,
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
