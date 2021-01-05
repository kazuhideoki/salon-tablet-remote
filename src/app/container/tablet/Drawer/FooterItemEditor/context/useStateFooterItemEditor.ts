import React from 'react';
import { selectedIconReducer } from './selectedIconReducer';
import { AppStateContext } from '../../../../../Store/appState/Context';
import { UserInfoContext } from '../../../../../Store/userInfo/Context';
import { IconsSetting } from '../components/iconSelect/icons';
import { MoodBad } from '@material-ui/icons';

export const useStateFooterItemEditor = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { is_admin } = userInfo;
  const { appState } = React.useContext(AppStateContext);
  const {
    modalSize,
    isModalSizeChanged,
    onTap,
    isEditting,
    footerItem,
  } = appState.edittingPrams;

  const [titleText, setTitleText] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.icon_name : ''
  );
  const [editorText, setEditorText] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.item_content : ''
  );
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.item_excerpt : ''
  );
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    isEditting || isModalSizeChanged
      ? IconsSetting.convertIconComponentFromName(
          footerItem.displayed_icon_name
        )
      : [MoodBad, 'MoodBad']
  );

  const [dataType, setDataType] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.data_type : 'default_data'
  );

  const [onTapRadio, setOnTapRadio] = React.useState(onTap);

  const [modalSizeRadio, setModalSizeRadio] = React.useState(modalSize);

  const [linkUrl, setLinkUrl] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.link_url : ''
  );
  const [appLinkUrl, setAppLinkUrl] = React.useState(
    isEditting || isModalSizeChanged ? footerItem.app_link_url : ''
  );

  const [
    charCountFooterItemContent,
    setCharCountFooterItemContent,
  ] = React.useState(0);

  return {
    isEditting,
    footerItem,
    is_admin,
    titleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    selectedIcon,
    dispatchSelectedIcon,
    dataType,
    setDataType,
    onTapRadio,
    setOnTapRadio,
    modalSizeRadio,
    setModalSizeRadio,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    charCountFooterItemContent,
    setCharCountFooterItemContent,
    setTitleText,
  };
};
