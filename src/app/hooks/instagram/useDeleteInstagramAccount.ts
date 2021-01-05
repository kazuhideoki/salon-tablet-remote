import React from 'react';
import { useGetInstagramAccounts } from './useGetInstagramAccounts';
import { apiInstagramAccountsDelete } from '../../../pages/api/instagram_accounts/delete';
import { InstagramContext } from '../../store/instagram/Context';
import { removeMedias } from '../../store/instagram/actions';
import { AppStateContext } from '../../store/appState/Context';
import {
  isLoadingInstagramAccounts,
  isShowInstagram,
} from '../../store/appState/actions';

export const useDeleteInstagramAccount = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { dispatchInstagram } = React.useContext(InstagramContext);

  const getInstagramAccounts = useGetInstagramAccounts();
  return async (instagram_id: number): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }

    dispatchAppState(isLoadingInstagramAccounts(true));

    try {
      await apiInstagramAccountsDelete({ instagram_id });
      dispatchAppState(isShowInstagram(false));
      dispatchInstagram(removeMedias());

      getInstagramAccounts();
    } catch (err) {
      console.log(`useDeleteInstagramAccount: ${err}`);

      alert('削除できませんでした');
      dispatchAppState(isLoadingInstagramAccounts(false));
    }
  };
};
