import React from "react";
import { Modal } from "./Modal/Modal";
import { Store } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { AppMobile } from "./mobile/AppMobile";
import { AppTablet } from "./AppTablet";
import { useIsMobile } from "../../lib/useIsMobile";
import { IndexProps } from "../../pages";
import { TSession } from "../../lib/auth/getSession";

type TAppViewPRops = {
  device: any,
  session: TSession,
}

const AppView = ({device, session}: TAppViewPRops) => {
  const isMobile = useIsMobile();
  const { dispatchAppState, appState } = React.useContext(Store);
  const { isSetPassword } = appState.userInfo;

  React.useEffect(function settingPassword() {
    if (session.emailVerified === false) {
      dispatchAppState({ type: "OPEN_MODAL", payload: "popup_not_email_verified" });
    }
  }, []);
  React.useEffect(
    function setTitle() {
      if (process.browser) {
        document.title = appState.userInfo.shop_name
          ? `${appState.userInfo.shop_name} | SALON TABLET`
          : "SALON TABLET";
      }
    },
    [appState.userInfo.shop_name]
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
      <ThemeProvider {...props.data.userInfo}>
        <AppView device={props.device} session={props.session} />
        <Modal />
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App