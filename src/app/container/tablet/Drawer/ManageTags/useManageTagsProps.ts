import React from 'react';
import {
  TextField,
  Button,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { CharCounter } from '../../../../components/CharCounter';
import { Skeleton } from '@material-ui/lab';
import { useHandleOnClick } from './context/useHandleOnClick';
import { useIsValidTagName } from './context/useIsValidTagName';
import { useDeleteTag } from '../../../../hooks/tags/useDeleteTag';
import { useStateMangeTags } from './context/useStateMangeTags';
import { useHandleLoadingTags } from './context/useHandleLoadingTags';

export const useManageTagsProps = () => {
  const {
    tags,
    loading,
    tagNameField,
    setTagNameField,
    isEditting,
    edittingTagId,
    edittingTagName,
    handleOnEditting,
    handleOnCreateNew,
  } = useStateMangeTags();

  const deleteTag = useDeleteTag();
  const handleOnClick = useHandleOnClick(
    isEditting,
    edittingTagId,
    tagNameField
  );
  const isValidTagName = useIsValidTagName(tagNameField);
  const handleLoadingTags = useHandleLoadingTags();

  return {
    tags,
    loading: loading.manageTags,
    edittingTagName,
    isEditting,
    tagNameField,
    setTagNameField,
    edittingTagId,
    handleOnClick,
    handleOnCreateNew,
    handleOnEditting,
    deleteTag,
    isValidTagName,
    handleLoadingTags,
  };
};

export type ManageTagsPresenterProps = ReturnType<typeof useManageTagsProps>;
