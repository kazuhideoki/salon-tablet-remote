import React from 'react';
import { ManageInstagramAccountsPresenter } from '../app/View/Drawer/ManageInstagmaAccounts';
export default {
  title: "Drawer/ManageInstagramAccountsPresenter",
  component: ManageInstagramAccountsPresenter,
};

const props = {
  instagramAccounts: null,
  instaAuth: "",
};

export const Normal = () => {

  return (
    <ManageInstagramAccountsPresenter {...props}/>
  )
}