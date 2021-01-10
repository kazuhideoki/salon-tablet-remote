import React from 'react';
import { useGetInstagramAccounts } from './useGetInstagramAccounts';
import { apiInstagramAccountsDelete } from '../../../pages/api/instagram_accounts/delete';
import { InstagramContext } from '../../stores/instagram/Context';
import { removeMedias } from '../../stores/instagram/actions';
import { AppStateContext } from '../../stores/appState/Context';
import {
  isLoadingInstagramAccounts,
  isShowInstagram,
} from '../../stores/appState/actions';

export const useDeleteInstagramAccount = (): ((
  instagram_id: number
) => Promise<void>) => {
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
