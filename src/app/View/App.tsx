import React from "react";
import { Modal } from "./Modal/Modal";
import { Store } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { AppMobile } from "./mobile/AppMobile";
import { AppTablet } from "./AppTablet";
import { useIsMobile } from "../../lib/useIsMobile";
import { IndexProps } from "../../pages";

const AppView = (props: {device: string}) => {
  const isMobile = useIsMobile();
  const { dispatchAppState, appState } = React.useContext(Store);
  const { isSetPassword } = appState.userInfo;

  // パスワード未設定でユーザー情報登録へ遷移
  // React.useEffect(function settingPassword() {
  //   if (isSetPassword === false) {
  //     dispatchAppState({ type: "OPEN_MODAL", payload: "setting_user_info" });
  //   }
  // }, []);
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
        <AppView device={props.device} />
        <Modal />
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App