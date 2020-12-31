import React from 'react';
import { SettingUserInfoPresenter } from '../app/View/tablet/Drawer/ManageUserInfo/view/ManageUserInfo';
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
}

//@ts-ignore
export const Normal = () => <SettingUserInfoPresenter {...props}/>;
