import React from "react";
import { Store } from "../../Store/Store";
import { T_selected_theme, T_theme_font } from "../../Store/Types";
import {
  apiUserInfoThemeFont,
  T_user_info_theme_font,
  TWhichFont,
} from "../../../pages/api/user_info/theme/font";
import { TFont1,TFont2 } from "../../Store/themes/fonts";

export const useChangeThemeFont = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { user_id } = appState.userInfo;

  return async (font: TFont1[0] | TFont2[0], whichFont: TWhichFont) => {
    const params: T_user_info_theme_font = {
      user_id,
      theme_font: font,
      whichFont,
    };

    console.log("useChangeThemeFontのparamsは " + JSON.stringify(params));

    const data = await apiUserInfoThemeFont(params);

    if (data.err === true) {
      alert("変更できませんでした");
      return false;
    } else {
      if (whichFont === 'theme_font2') {
        dispatchAppState({
          // SET_THEMEではparamが増える度に更新の必要あり
          type: "SET_THEME_FONT2",
          payload: { themeFont: font },
        });
      } else if (whichFont === 'theme_font1'){
        dispatchAppState({
          // SET_THEMEではparamが増える度に更新の必要あり
          type: "SET_THEME_FONT1",
          payload: { themeFont: font },
        });
      } else if (whichFont === 'theme_font_heading') {
        dispatchAppState({
          // SET_THEMEではparamが増える度に更新の必要あり
          type: "SET_THEME_FONT_HEADING",
          payload: { themeFont: font },
        });
      }

      return true;
    }
  };
};
