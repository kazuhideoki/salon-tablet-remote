import React from "react";
import { SelectInstagramAccountsPresenter } from "../app/View/Footer/SelectInstagramAccounts";
export default {
  title: "Footer/SelectInstagramAccountsPresenter",
  component: SelectInstagramAccountsPresenter,
};

const props = {
  instagramAccounts: null,
  getInstagramMedias: null,
};

export const Normal = () => {
  return <SelectInstagramAccountsPresenter {...props} />;
};
