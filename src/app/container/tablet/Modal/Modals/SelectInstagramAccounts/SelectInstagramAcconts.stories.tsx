import React from 'react';
import {
  SelectInstagramAccountsPresenter,
  SelectInstagramAccountsPresenterProps,
} from './SelectInstagramAccounts';
import { sampleInstagramAccounts } from '../../../../../../util/dev/sampleInstagramAccounts';
export default {
  title: 'Footer/SelectInstagramAccountsPresenter',
  component: SelectInstagramAccountsPresenter,
};

const props: SelectInstagramAccountsPresenterProps = {
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
