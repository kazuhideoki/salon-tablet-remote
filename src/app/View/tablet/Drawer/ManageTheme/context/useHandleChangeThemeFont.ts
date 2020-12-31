import React from "react";
import { useChangeThemeFont } from "./useChangeThemeFont";
import { TFont1, TFont2 } from "../../../../../Store/theme/lib/fonts";
import { UserInfoContext } from "../../../../../Store/userInfo/Context";

export const useHandleChangeThemeFont1 = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const [font1, setFont1] = React.useState(userInfo.theme_font1);
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
  const { userInfo } = React.useContext(UserInfoContext);
  const [font2, setFont2] = React.useState(userInfo.theme_font2);
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
  const { userInfo } = React.useContext(UserInfoContext);
  const [fontHeading, setFontHeading] = React.useState(
    userInfo.theme_font_heading
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
