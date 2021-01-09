import React from 'react';
import { closeModal } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
export const useCloseModal = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { setModal } = appState;

  return () => {
    let closing = true;
    if (
      setModal === 'edit_article' ||
      setModal === 'edit_footer_item' ||
      setModal === 'edit_info_bar'
    ) {
      closing = confirm('編集中ですが保存せずにウィンドウを閉じますか？');
    }

    if (closing) {
      dispatchAppState(closeModal());
    }
  };
};
