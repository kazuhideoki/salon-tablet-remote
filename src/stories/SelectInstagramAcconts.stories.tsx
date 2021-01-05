import React from 'react';
import {
  SelectInstagramAccountsPresenter,
  TSelectInstagramAccountsPresenter,
} from '../app/container/tablet/Modal/Modals/SelectInstagramAccounts/SelectInstagramAccounts';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
export default {
  title: 'Footer/SelectInstagramAccountsPresenter',
  component: SelectInstagramAccountsPresenter,
};

const props: TSelectInstagramAccountsPresenter = {
  instagramAccounts: sampleInstagramAccounts,
  getInstagramMedias: async () => {
    return;
  },
  isSetting: false,
  isMobile: false,
};

export const Normal = () => {
  return <SelectInstagramAccountsPresenter {...props} />;
};
