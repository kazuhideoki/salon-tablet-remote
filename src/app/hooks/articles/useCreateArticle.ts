import React from 'react';
import { useGetArticles } from './useGetArticles';
import {
  ApiArticlesCreate,
  apiArticlesCreate,
} from '../../../pages/api/articles/create';
import { DataTypeArticle } from '../../../util/interface/Interface';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import { closeModal, isLoadingMain } from '../../stores/appState/actions';

export type CreateArticleParams = {
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[];
  dataType: DataTypeArticle;
};
export const useCreateArticle = () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);

  return async (param: CreateArticleParams, isPublished: boolean) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingMain(true));

    const params: ApiArticlesCreate = {
      is_published: isPublished,
      title: param.titleText,
      article_content: param.editorText,
      article_excerpt: param.editorTextExcerpt,
      article_img: param.editorImg,
      tag_ids: param.selectedTags.length
        ? JSON.stringify(param.selectedTags)
        : null,
      data_type: param.dataType,
      user_id: userInfo.user_id,
    };

    try {
      await apiArticlesCreate(params);

      dispatchAppState(closeModal());
      getArticles(appState.isSetting, 1, []);
    } catch (e) {
      alert('投稿できませんでした');
      dispatchAppState(isLoadingMain(false));
    }
  };
};
