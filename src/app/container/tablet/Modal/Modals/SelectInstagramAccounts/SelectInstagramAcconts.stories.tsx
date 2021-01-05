import React from 'react';
import {
  SelectInstagramAccountsPresenter,
  TSelectInstagramAccountsPresenter,
} from './SelectInstagramAccounts';
import { sampleInstagramAccounts } from '../../../../../../stories/lib/sampleInstagramAccounts';
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
