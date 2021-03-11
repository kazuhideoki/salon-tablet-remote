import React from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import { useIsMobile } from '../../../../../../util/useIsMobile';
import { HelpButton } from '../../../../../components/HelpButton';
import { useManageInstagramAccountsProps } from '../../../Drawer/ManageInstagramAccounts/useManageInstagramAccounts';
import { useStateSelectInstagramAccounts } from './context/useStateSelectInstagramAccounts';

export const useSelectInstagramAccountsProps = () => {
  const { instagramAccounts, isSetting } = useStateSelectInstagramAccounts();

  const { getInstagramMedias } = useManageInstagramAccountsProps();

  const isMobile = useIsMobile();

  return {
    isSetting,
    instagramAccounts,
    getInstagramMedias,
    isMobile,
  };
};
export type SelectInstagramAccountsPresenterProps = ReturnType<
  typeof useSelectInstagramAccountsProps
>;
