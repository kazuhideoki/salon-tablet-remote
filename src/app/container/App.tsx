import React from 'react';
import { Modal } from './tablet/Modal/Modal/Modal';
import { AppMobile } from './mobile/AppMobile';
import { AppTablet } from './tablet/AppTablet';
import { useIsMobile } from '../../util/useIsMobile';
import { IndexProps, IndexPropsData } from '../../pages';
import { ApiGetSessionReturn } from '../../pages/api/auth/get_session';
import { UserInfoContext } from '../store/userInfo/Context';
import { StoreContextProvider } from '../store/Store';
import { useDrawerProps } from './tablet/Drawer/Drawer/Drawer';
import { UaDeviceType } from '../../util/interface/Interface';

type AppViewProps = {
  session: ApiGetSessionReturn;
};

const AppView = ({ session }: AppViewProps) => {
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

type Props = {
  data: IndexPropsData;
  isPublicPage: boolean;
  device: UaDeviceType;
  session: ApiGetSessionReturn;
};

export const App = (props: Props) => {
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
