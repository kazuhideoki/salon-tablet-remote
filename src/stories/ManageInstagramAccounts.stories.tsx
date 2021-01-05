import React from 'react';
import {
  ManageInstagramAccountsPresenter,
  TManageInstagramAccountsPresenter,
} from '../app/container/tablet/Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
export default {
  title: 'Drawer/ManageInstagramAccountsPresenter',
  component: ManageInstagramAccountsPresenter,
};

const props: TManageInstagramAccountsPresenter = {
  instagramAccounts: sampleInstagramAccounts,
  instaAuth: '',
  deleteInstagramAccount: async () => {
    return;
  },
  getInstagramMedias: async () => {
    return;
  },
  loading: false,
  handleLoadingInstagramAccounts: () => {
    return;
  },
};

export const Normal = () => {
  return <ManageInstagramAccountsPresenter {...props} />;
};
export const Loading = () => {
  return <ManageInstagramAccountsPresenter {...props} loading={true} />;
};
export const noInstagramAccounts = () => {
  return <ManageInstagramAccountsPresenter {...props} instagramAccounts={[]} />;
};
