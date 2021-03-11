import React from 'react';
import { sampleUserInfo } from '../../../../../util/dev/sampleUserInfo';
import { SettingUserInfoPresenter } from './ManageUserInfo';
import { ManageUserInfoPresenterProps } from './useManageUserInfoProps';
export default {
  title: 'Drawer/Account/SettingUserInfo',
  component: SettingUserInfoPresenter,
};

const props: ManageUserInfoPresenterProps = {
  name: '',
  setName: () => {
    return;
  },
  shopName: '',
  setShopName: () => {
    return;
  },
  email: '',
  password: '123456aA',
  setPassword: () => {
    return;
  },
  userInfo: sampleUserInfo,
  updateUser: async () => {
    return;
  },
  openModal: () => {
    return;
  },
  isShowMobile: false,
  setIsShowMobile: () => {
    return;
  },
  handleSwitch: async () => {
    return;
  },
  clearHistory: () => {
    return;
  },
};

export const Normal = (): JSX.Element => (
  <SettingUserInfoPresenter {...props} />
);
