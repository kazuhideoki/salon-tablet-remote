import React from 'react';
import { SelectInstagramAccountsPresenter } from './SelectInstagramAccounts';
import { sampleInstagramAccounts } from '../../../../../../util/dev/sampleInstagramAccounts';
import { SelectInstagramAccountsPresenterProps } from './useSelectInstagramAccountProps';
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
