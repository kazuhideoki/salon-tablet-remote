import React from 'react';
import { Typography } from '@material-ui/core';
import ReactQuill, { Quill } from 'react-quill';
import { useStateFooterItemModal } from './context/useStateFooterItemModal';

export const useFooterItemModalProps = () => {
  const { footerItem } = useStateFooterItemModal();

  return {
    footerItem,
  };
};

export type FooterItemModalPresenterProps = ReturnType<
  typeof useFooterItemModalProps
>;
