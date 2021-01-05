import React from 'react';
import { useGetArticles } from '../../container/tablet/Main/context/lib/useGetArticles';
import {
  T_articles_create,
  apiArticlesCreate,
} from '../../../pages/api/articles/create';
import { T_data_type_article } from '../../Store/Interface';
import { UserInfoContext } from '../../Store/userInfo/Context';
import { AppStateContext } from '../../Store/appState/Context';
import { closeModal, isLoadingMain } from '../../Store/appState/actions';

export type TCreateArticle = {
  titleText: string;
  editorText: string;
  editorTextExcerpt: string;
  editorImg: string;
  selectedTags: number[];
  dataType: T_data_type_article;
};
export const useCreateArticle = () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);

  return async (param: TCreateArticle, isPublished: boolean) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingMain(true));

    const params: T_articles_create = {
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
