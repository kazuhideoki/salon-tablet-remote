import React from 'react';
import {
  SelectInstagramAccountsPresenter,
  TSelectInstagramAccountsPresenter,
} from '../app/View/tablet/Modal/Modals/SelectInstagramAccounts/view/SelectInstagramAccounts';
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
