import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from '@material-ui/core';
import { DeleteButton } from '../../../../components/editButtonBox/DeleteButton';
import { Skeleton } from '@material-ui/lab';
import { useDeleteInstagramAccount } from '../../../../hooks/instagram/useDeleteInstagramAccount';
import { useStateManageInstagramAccount } from './context/useStateManageInstagramAccount';
import { useHandleLoadingInstagramAccounts } from './context/useHandleLoadingInastagramAccounts';
import { useGetInstagramMedias } from '../../../../hooks/instagram/useGetInstagramMedias';

export const useManageInstagramAccountsProps = () => {
  const {
    instagramAccounts,
    loading,
    instaAuth,
  } = useStateManageInstagramAccount();
  const handleLoadingInstagramAccounts = useHandleLoadingInstagramAccounts();

  const deleteInstagramAccount = useDeleteInstagramAccount();
  const getInstagramMedias = useGetInstagramMedias();

  return {
    instagramAccounts,
    getInstagramMedias,
    instaAuth,
    deleteInstagramAccount,
    loading: loading.manageInstagramAccounts,
    handleLoadingInstagramAccounts,
  };
};
export type ManageInstagramAccountsPresenterProps = ReturnType<
  typeof useManageInstagramAccountsProps
>;
