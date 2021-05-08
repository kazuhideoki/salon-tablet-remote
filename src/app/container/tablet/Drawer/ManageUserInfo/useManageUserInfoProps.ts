import { useGoogleSearchProps } from '../../Modal/Modals/GoogleSearch/useGoogleSearchProps';
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
