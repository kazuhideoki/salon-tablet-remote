import React from 'react'
import { SvgIcon } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { TArrowProps } from './PaginationArrows';
import { Store } from '../../../Store/Store';
import { useGetInstagramMedias } from '../../../ActionCreator/instagramMedias/useGetInstagramMedias';
import { instagramMediasReducer } from '../../../Reducer/instagramMediasReducer';
import { TPaginationArrows } from "./PaginationArrows";


export const PaginationInstagram:React.FC<TPaginationArrows> = (props) => {

  const { instagramMedias, appState } = React.useContext(Store)
  const getInstagramMedias = useGetInstagramMedias()
  const { cursors, next, previous} = instagramMedias.paging

  // 最初か最後のページでdisable
  // ページ送りがある場合 nextやpreviousが入る。(https〜のget)

  return (
    <div>
      <SvgIcon
        fontSize="inherit"
        onClick={
          previous
            ? () =>
                getInstagramMedias(
                  appState.selectedInstagramAccount.id,
                  appState.selectedInstagramAccount.username,
                  {before: cursors.before}
                )
            : null
        }
      >
        <NavigateBefore className={previous ? null : props.classes.disable} />
      </SvgIcon>
      <SvgIcon
        fontSize="inherit"
        onClick={
          next
            ? () =>
                getInstagramMedias(
                  appState.selectedInstagramAccount.id,
                  appState.selectedInstagramAccount.username,
                  {after: cursors.after}
                )
            : null
        }
      >
        <NavigateNext className={next ? null : props.classes.disable} />
      </SvgIcon>
    </div>
  );
}
