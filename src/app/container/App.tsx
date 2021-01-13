import React from 'react';
import { Modal } from './tablet/Modal/Modal/Modal';
import { AppMobile } from './mobile/AppMobile';
import { AppTablet } from './tablet/AppTablet';
import { useIsMobile } from '../../util/useIsMobile';
import { IndexProps } from '../../pages';
import { ApiGetSessionReturn } from '../../pages/api/auth/get_session';
import { UserInfoContext } from '../stores/userInfo/Context';
import { StoreContextProvider } from '../stores/Store';
import { useDrawerProps } from './tablet/Drawer/Drawer/Drawer';

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

export type AppProps = Required<IndexProps>;

export const App = (props: AppProps) => {
  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider {...props}>
      <AppView session={props.session} />
      <Modal />
    </StoreContextProvider>
  );
};

export default App;
