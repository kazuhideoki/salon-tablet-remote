import React from "react";
import { Modal } from "./tablet/Modal/Modal/view/Modal";
import { ThemeProvider } from "../Store/theme/ThemeProvider";
import { AppMobile } from "./mobile/AppMobile";
import { AppTablet } from "./tablet/AppTablet";
import { useIsMobile } from "../../lib/useIsMobile";
import { IndexProps } from "../../pages";
import { T_auth_get_session_return } from "../../pages/api/auth/get_session";
import { UserInfoContext } from "../Store/userInfo/Context";
import { StoreContextProvider } from "../Store/Store";
import { useDrawerProps } from "./tablet/Drawer/Drawer/view/Drawer";

type TAppViewProps = {
  device: any,
  session: T_auth_get_session_return,
}

const AppView = ({device, session}: TAppViewProps) => {
  const isMobile = useIsMobile();
  const { openModal } = useDrawerProps()
  const { userInfo } = React.useContext(UserInfoContext);

  React.useEffect(function settingPassword() {
    if (session.emailVerified === false) {
      openModal("popup_not_email_verified");
    }
  }, []);
  React.useEffect(
    function setTitle() {
      if (process.browser) {
        document.title = userInfo.shop_name
          ? `${userInfo.shop_name} | SALON TABLET`
          : "SALON TABLET";
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

export const App = (props: IndexProps) => {
  
  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider
      {...props.data}
      isPublicPage={props.isPublicPage}
      device={props.device}
      samplePage={props.samplePage}
    >
        <AppView device={props.device} session={props.session} />
        <Modal />
    </StoreContextProvider>
  );
}

export default App