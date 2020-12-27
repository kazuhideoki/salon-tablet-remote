import React from "react";
import { TWhichFont } from "../../../../../../pages/api/user_info/theme/font";
import { useChangeThemeFont } from "../../../../../ActionCreator/user/useChangeThemeFont";
import { Store } from "../../../../../Store/Store";
import { TFont1, TFont2 } from "../../../../../Store/themes/fonts";
import { T_theme_font } from "../../../../../Store/Types";

export const useHandleChangeThemeFont1 = () => {
  const { appState } = React.useContext(Store);
  const [font1, setFont1] = React.useState(appState.userInfo.theme_font1);
  const changeThemeFont = useChangeThemeFont();

  const handleChangeThemeFont1 = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const isChanged = await changeThemeFont(
      event.target.value as TFont1[0],
      "theme_font1"
    );
    if (isChanged) {
      setFont1(event.target.value as TFont1[0]);
    }
  };

  return { font1, handleChangeThemeFont1 };
};

export const useHandleChangeThemeFont2 = () => {
  const { appState } = React.useContext(Store);
  const [font2, setFont2] = React.useState(appState.userInfo.theme_font2);
  const changeThemeFont = useChangeThemeFont();

  const handleChangeThemeFont2 = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const isChanged = await changeThemeFont(
      event.target.value as TFont2[0],
      "theme_font2"
    );
    if (isChanged) {
      setFont2(event.target.value as TFont2[0]);
    }
  };

  return { font2, handleChangeThemeFont2 };
};
export const useHandleChangeThemeFontHeading = () => {
  const { appState } = React.useContext(Store);
  const [fontHeading, setFontHeading] = React.useState(
    appState.userInfo.theme_font_heading
  );
  const changeThemeFont = useChangeThemeFont();

  const handleChangeThemeFontHeading = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const isChanged = await changeThemeFont(
      event.target.value as TFont2[0],
      "theme_font_heading"
    );
    if (isChanged) {
      setFontHeading(event.target.value as TFont2[0]);
    }
  };

  return { fontHeading, handleChangeThemeFontHeading };
};
