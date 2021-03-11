import React from 'react';
import { SelectIcon } from './components/iconSelect/SelectIcon';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../QuillEditor/QuillEditor'), {
  ssr: false,
});
import { SwitchOnTapModal } from './components/SwitchOnTapModal';
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Switch,
  useTheme,
} from '@material-ui/core';
import { SelectAppLink } from './components/SelectAppLink';
import { CharCounter } from '../../../../components/CharCounter';
import { SelectModalSize } from './components/SelectModalSize';
import { HelpButton } from '../../../../components/HelpButton';
import { PublishTwoTone, SaveTwoTone } from '@material-ui/icons';
import { SwitchDataTypeBox } from '../QuillEditor/components/SwitchDataTypeBox';
import { useIsMobile } from '../../../../../util/useIsMobile';
import { useHandleSubmit } from './context/useHandleSubmit';
import { useHandleChange } from './context/useHandleChange';
import { useHandleOnSidebar } from './context/useHandleOnSidebar';
import { useStateFooterItemEditor } from './context/useStateFooterItemEditor';
import { FooterItemEdittingParams } from '../../../../hooks/footerItems/useCreateFooterItem';
import {
  DataTypeArticle,
  DataTypeFooterItem,
} from '../../../../../util/interface/Interface';
import { DataTypeAndSet } from '../QuillEditor/components/SwitchDataTypeBox';

export const useFooterItemEditorProps = () => {
  const {
    isEditting,
    footerItem,
    is_admin,
    titleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    selectedIcon,
    setSelectedIcon,
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
  } = useStateFooterItemEditor();

  const isMobile = useIsMobile();

  const { onSidebar, handleOnSidebar } = useHandleOnSidebar(
    isEditting,
    footerItem
  );

  const edittingFooterItemParams: FooterItemEdittingParams = {
    titleText,
    selectedIcon,
    onTapRadio,
    modalSizeRadio,
    editorText,
    editorTextExcerpt,
    linkUrl,
    appLinkUrl,
    onSidebar,
    dataType,
  };

  const handleSubmit = useHandleSubmit(edittingFooterItemParams, isEditting);

  const handleChange = useHandleChange(edittingFooterItemParams);

  const dataTypeAndSet: DataTypeAndSet<DataTypeFooterItem> = {
    dataType,
    setDataType,
  };

  return {
    onTapRadio,
    setOnTapRadio,
    modalSizeRadio,
    setModalSizeRadio,
    isEditting,
    titleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    selectedIcon,
    setSelectedIcon,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    charCountFooterItemContent,
    setCharCountFooterItemContent,
    setTitleText,
    handleSubmit,
    dataTypeAndSet,
    is_admin,
    isMobile,
    onSidebar,
    handleOnSidebar,
    edittingFooterItemParams,
    handleChange,
  };
};

export type FooterItemEditorPresenterProps = ReturnType<
  typeof useFooterItemEditorProps
>;
