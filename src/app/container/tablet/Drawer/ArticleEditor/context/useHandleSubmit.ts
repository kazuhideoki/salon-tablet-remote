import React from 'react';
import {
  useCreateArticle,
  CreateArticleParams,
} from '../../../../../hooks/articles/useCreateArticle';
import { useUpdateArticle } from '../../../../../hooks/articles/useUpdateArticle';

type Props = { params: CreateArticleParams; isEditting: boolean };

export const useHandleSubmit = (props: Props) => {
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  return (isPublished: boolean) => {
    // 記事編集
    if (props.isEditting) {
      updateArticle(props.params, isPublished);
      // 記事作成
    } else {
      createArticle(props.params, isPublished);
    }
  };
};
