import React from 'react'
import {
  useCreateArticle,
  TCreateArticle,
} from "./useCreateArticle";
import { useUpdateArticle } from "./useUpdateArticle";

type Type = { is_published: boolean }

export const useHandleSubmit = (
         params: TCreateArticle,
         isEditting: boolean
       ) => {
         const createArticle = useCreateArticle();
         const updateArticle = useUpdateArticle();

         return ({ is_published }: Type) => {
           params.is_published = is_published;
           // 記事編集
           if (isEditting) {
             updateArticle(params);
             // 記事作成
           } else {
             createArticle(params);
           }
         };
       };