import React from 'react';
import dynamic from 'next/dynamic';
const SmallQuillEditor = dynamic(
  () => import('./components/SmallQuillEditor'),
  {
    ssr: false,
  }
);
import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import { CharCounter } from '../../../../components/CharCounter';
import { SwitchOnTapInfoBar } from './components/SwitchOnTapInfoBar';
import { SelectArticleInfoBar } from './components/SelectArticleInfoBar';
import { PublishTwoTone } from '@material-ui/icons';
import { useStateInfoBarEditor } from './context/useStateInfoBarEditor';
import { useUpdateInfoBar } from '../../../../hooks/infoBar/useUpdateInfoBar';

export const useInfoBarEditorProps = () => {
  const {
    allArticles,
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    articleInfoBar,
    setArticleInfoBar,
    charCount,
    setCharCount,
  } = useStateInfoBarEditor();

  const updateInfoBar = useUpdateInfoBar({
    infoBarType,
    editorText,
    articleInfoBar,
    charCount,
  });

  return {
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    articleInfoBar,
    setArticleInfoBar,
    allArticles,
    updateInfoBar,
  };
};

export type InfoBarEditorPresenterProps = ReturnType<
  typeof useInfoBarEditorProps
>;
