import React from "react";
import { Modal } from "./Modal/Modal";
import { Store } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { AppMobile } from "./mobile/AppMobile";
import { IndexProps } from "../../pages";
import { AppTablet } from "./AppTablet";
import { useMediaQuery } from "@material-ui/core";

const AppView = () => {

  const isMobile = useMediaQuery("(max-width:480px)");
  const {
    dispatchAppState,
    appState,
  } = React.useContext(Store);
  const { is_first_sign_in, isSetPassword } = appState.userInfo;
  // console.log("AppViewのis_first_sign_inは " + is_first_sign_in);

  // パスワード未設定でユーザー情報登録へ遷移
  React.useEffect(function settingPassword() {
    if (isSetPassword === false) {
      dispatchAppState({ type: "OPEN_MODAL", payload: "setting_user_info" })
    }

  },[])
  React.useEffect(function setTitle() {
    if (process.browser) {
      document.title = appState.userInfo.shop_name ? `${appState.userInfo.shop_name} | SALON TABLET` : 'SALON TABLET'
    }
  },[appState.userInfo.shop_name])


  if (isMobile && appState.isSetting) {
    return <AppMobile/>
  } else {
    return <AppTablet/>
  }

}

export const App = (props: IndexProps) => {
  
  return (
    // Storeの情報をContextから読み込んで出力
    <StoreContextProvider data={props.data}>
      <ThemeProvider {...props.data.userInfo}>
        <AppView />
        <Modal />
      </ThemeProvider>
    </StoreContextProvider>
  );
}

export default App