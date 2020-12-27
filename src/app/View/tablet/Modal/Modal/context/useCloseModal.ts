import React from 'react'
import { Store } from '../../../../../Store/Store';
export const useCloseModal = () => {
    const { appState, dispatchAppState } = React.useContext(Store);
    const { setModal } = appState

  return () => {
    let closing = true;
    if (
      setModal === "edit_article" ||
      setModal === "edit_footer_item" ||
      setModal === "edit_info_bar"
    ) {
      closing = confirm("編集中ですが保存せずにウィンドウを閉じますか？");
    }

    if (closing) {
      dispatchAppState({ type: "CLOSE_MODAL" });
    }
  };
}