import React from 'react';
import { Modal } from './tablet/Modal/Modal/Modal';
import { AppMobile } from './mobile/AppMobile';
import { AppTablet } from './tablet/AppTablet';
import { useIsMobile } from '../../util/useIsMobile';
import { TIndexProps, TIndexPropsData } from '../../pages';
import { T_auth_get_session_return } from '../../pages/api/auth/get_session';
import { UserInfoContext } from '../store/userInfo/Context';
import { StoreContextProvider } from '../store/Store';
import { useDrawerProps } from './tablet/Drawer/Drawer/Drawer';
import { TUaDeviceType } from '../../util/interface/Interface';

type TAppViewProps = {
  session: T_auth_get_session_return;
};

const AppView = ({ session }: TAppViewProps) => {
  const isMobile = useIsMobile();
  const { openModal } = useDrawerProps();
  const { userInfo } = React.useContext(UserInfoContext);

  React.useEffect(function settingPassword() {
    if (session.emailVerified !== true) {
      openModal('popup_not_email_verified');
    }
  }, []);
  React.useEffect(
    function setTitle() {
      if (typeof window !== 'undefined') {
        document.title = userInfo.shop_name
          ? `${userInfo.shop_name} | SALON TABLET`
          : 'SALON TABLET';
      }
    },
    [userInfo.shop_name]
  );

  if (isMobile) {
    return <AppMobile />;
  } else {
    return <AppTablet />;
  }
};

type TApp = {
  data: TIndexPropsData;
  isPublicPage: boolean;
  device: TUaDeviceType;
  session: T_auth_get_session_return;
};

export const App = (props: TApp) => {
  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider
      {...props.data}
      isPublicPage={props.isPublicPage}
      device={props.device}>
      <AppView session={props.session} />
      <Modal />
    </StoreContextProvider>
  );
};

export default App;
