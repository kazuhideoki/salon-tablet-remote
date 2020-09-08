import React from "react";
import { SelectInstagramAccountsPresenter } from "../app/View/Footer/SelectInstagramAccounts";
export default {
  title: "Footer/SelectInstagramAccountsPresenter",
  component: SelectInstagramAccountsPresenter,
};

const props = {
  instagramAccounts: null,
  getInstagramMedias: null,
  isSetting: false,
  isMobile: false,
};

export const Normal = () => {
  return <SelectInstagramAccountsPresenter {...props} />;
};
