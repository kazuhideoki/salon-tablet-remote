import React from 'react'
import { Store } from '../../../../../Store/Store';
export const useStateAccount = () => {
  const { appState } = React.useContext(Store);
  const { userInfo } = appState;

  const [name, setName] = React.useState(userInfo.user_name || "");
  const [shopName, setShopName] = React.useState(userInfo.shop_name || "");
  const [email, setEmail] = React.useState(userInfo.user_email);
  const [password, setPassword] = React.useState("");
  const [isShowMobile, setIsShowMobile] = React.useState(
    userInfo.is_generate_public_page
  );

  return {
    userInfo,
    name,
    setName,
    shopName,
    setShopName,
    email,
    setEmail,
    password,
    setPassword,
    isShowMobile,
    setIsShowMobile,

  }
}