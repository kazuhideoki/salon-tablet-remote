import React from 'react';
import { SettingUserInfoPresenter } from '../app/View/Drawer/Account/ManageUserInfo';
export default {
  title: "Drawer/Account/SettingUserInfo",
  component: SettingUserInfoPresenter,
};

const props = {
  name: null,
  setName: null,
  shopName: null,
  setShopName: null,
  email: null,
  password: "123456aA",
  setPassword: null,
  userInfo: {
    shop_name: '美容室ABC',
  },
  updateUser: null,
  handleOnSubmit: null,
  openDeleteAccountForm: null,
}

//@ts-ignore
export const Normal = () => <SettingUserInfoPresenter {...props}/>;
