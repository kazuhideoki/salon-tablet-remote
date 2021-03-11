import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Settings } from '@material-ui/icons';
import {
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { QrPopover } from './components/QrPopover';
import { HelpButton } from '../../../../components/HelpButton';
import { useGoogleSearchProps } from '../../Modal/Modals/GoogleSearch/GoogleSearch';
import { useHandleSwitch } from './context/useHandleSwitch';
import { useStateAccount } from './context/useStateAccount';
import { useDrawerProps } from '../Drawer/useDrawerPops';
import { useUpdateUser } from '../../../../hooks/userInfo/useUpdateUser';

export const useManageUserInfoProps = () => {
  const {
    userInfo,
    name,
    setName,
    shopName,
    setShopName,
    email,
    password,
    setPassword,
    isShowMobile,
    setIsShowMobile,
  } = useStateAccount();

  const updateUser = useUpdateUser({
    name,
    shopName,
    email,
    password,
    isShowMobile,
  });
  const { openModal } = useDrawerProps();
  const handleSwitch = useHandleSwitch();
  const { clearHistory } = useGoogleSearchProps();

  return {
    name,
    setName,
    shopName,
    setShopName,
    email,
    password,
    setPassword,
    userInfo,
    updateUser,
    isShowMobile,
    setIsShowMobile,
    handleSwitch,
    clearHistory,
    openModal,
  };
};

export type ManageUserInfoPresenterProps = ReturnType<
  typeof useManageUserInfoProps
>;
