import React from 'react';
import { useChangeThemeFont } from '../../../../../hooks/userInfo/theme/useChangeThemeFont';
import { Font1, Font2 } from '../../../../../stores/theme/lib/fonts';
import { UserInfoContext } from '../../../../../stores/userInfo/Context';

export const useHandleChangeThemeFont1 = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const [font1, setFont1] = React.useState(userInfo.theme_font1);
  const changeThemeFont = useChangeThemeFont();

  const handleChangeThemeFont1 = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    try {
      await changeThemeFont(event.target.value as Font1[0], 'theme_font1');
      setFont1(event.target.value as Font1[0]);
    } catch (err) {
      console.log(`handleChangeThemeFont1: ${err}`);
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
    try {
      await changeThemeFont(event.target.value as Font2[0], 'theme_font2');
      setFont2(event.target.value as Font2[0]);
    } catch (err) {
      console.log(`handleChangeThemeFont2: ${err}`);
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
    try {
      await changeThemeFont(
        event.target.value as Font2[0],
        'theme_font_heading'
      );
      setFontHeading(event.target.value as Font2[0]);
    } catch (err) {
      console.log(`handleChangeThemeFontHeading: ${err}`);
    }
  };

  return { fontHeading, handleChangeThemeFontHeading };
};
