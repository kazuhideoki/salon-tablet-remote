import React from 'react';
import { useCreateArticle, TCreateArticle } from './useCreateArticle';
import { useUpdateArticle } from './useUpdateArticle';

export type THandleSubmit = { params: TCreateArticle; isEditting: boolean };

export const useHandleSubmit = (props: THandleSubmit) => {
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
