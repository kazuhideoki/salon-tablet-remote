import React from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import ReactQuill, { Quill } from 'react-quill';
import { useStateContentModal } from './context/useStateContentModal';

export const useContentModalProps = () => {
  const { article } = useStateContentModal();

  return {
    article,
  };
};

export type ContentModalPresenterProps = ReturnType<
  typeof useContentModalProps
>;
