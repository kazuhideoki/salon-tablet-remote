import React from "react";
import { Modal } from "./Modal/Modal";
import { Store } from "../Store/Store";
import { ThemeProvider } from "../Store/ThemeContext";
import { StoreContextProvider } from "../Store/Store";
import { AppMobile } from "./mobile/AppMobile";
import { IndexProps, IndexPropsData } from "../../pages";
import { AppTablet } from "./AppTablet";
import { useMediaQuery } from "@material-ui/core";
import { useIsMobile } from "../../lib/useIsMobile";

const AppView = (props: {device: string}) => {
  // const isMobile = useMediaQuery("(max-width:480px)");
  const isMobile = useIsMobile();
  const { dispatchAppState, appState } = React.useContext(Store);
  const { isSetPassword } = appState.userInfo;
  // console.log("AppViewのis_first_sign_inは " + is_first_sign_in);

  // パスワード未設定でユーザー情報登録へ遷移
  React.useEffect(function settingPassword() {
    if (isSetPassword === false) {
      dispatchAppState({ type: "OPEN_MODAL", payload: "setting_user_info" });
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

  // // SSRで初期表示させるときの処理
  // if (process.browser === false) {
  //   if (props.device === 'mobile' || 'wearable') {
  //     console.log('★mobile');   
  //     return <AppMobile />;
  //   } else {
  //     console.log("★tablet");
  //     return <AppTablet />;
  //   }
  // }

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