import React from 'react';
import { ManageInstagramAccountsPresenter } from '../app/View/Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts';
import { TInstagramAccounts } from '../app/Store/Types';
import { sampleInstagramAccounts } from './lib/sampleInstagramAccounts';
export default {
  title: "Drawer/ManageInstagramAccountsPresenter",
  component: ManageInstagramAccountsPresenter,
};

const props = {
  instagramAccounts: sampleInstagramAccounts,
  instaAuth: "",
  deleteInstagramAccount: null,
  getInstagramMedias: null,
  loading: false
};

export const Normal = () => {

  return (
    <ManageInstagramAccountsPresenter {...props}/>
  )
}
export const Loading = () => {

  return (
    <ManageInstagramAccountsPresenter {...props} loading={true}/>
  )
}
export const noInstagramAccounts = () => {

  return (
    <ManageInstagramAccountsPresenter {...props} instagramAccounts={[]}/>
  )
}