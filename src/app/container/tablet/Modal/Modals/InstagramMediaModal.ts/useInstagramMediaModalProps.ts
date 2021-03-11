import React from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { sqlToDate } from '../../../../../../util/sqlToDate';
import { useStateInstagramMediaModal } from './context/useStateInstagramMediaModal';

export const useInstagramMediaModalProps = () => {
  const { instagramMedia } = useStateInstagramMediaModal();

  return {
    instagramMedia,
  };
};

export type InstagramMediaModalPresenterProps = ReturnType<
  typeof useInstagramMediaModalProps
>;
