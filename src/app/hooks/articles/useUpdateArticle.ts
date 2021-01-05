import React from 'react';
import { useGetArticles } from './useGetArticles';
import { TCreateArticle } from './useCreateArticle';
import {
  T_articles_update,
  apiArticlesUpdate,
} from '../../../pages/api/articles/update';
import { ArticlesContext } from '../../store/articles/Context';
import { AppStateContext } from '../../store/appState/Context';
import { closeModal, isLoadingMain } from '../../store/appState/actions';

export type TUpdateArticle = TCreateArticle;

export const useUpdateArticle = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext);

  const getArticles = useGetArticles();

  return async (param: TUpdateArticle, isPublished: boolean) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingMain(true));

    const params: T_articles_update = {
      // dbに そのまま入れられるように paramsとwhereに使うidは分けておく
      params: {
        is_published: isPublished,
        title: param.titleText,
        article_content: param.editorText,
        article_excerpt: param.editorTextExcerpt,
        article_img: param.editorImg,
        tag_ids: param.selectedTags.length
          ? JSON.stringify(param.selectedTags)
          : null,
        data_type: param.dataType,
      },
      article_id: appState.edittingPrams.article.article_id,
    };

    try {
      await apiArticlesUpdate(params);

      dispatchAppState(closeModal());

      getArticles(appState.isSetting, paginationParams.page);
    } catch (err) {
      console.log(`useUpdateArticle: ${err}`);

      alert('更新できませんでした');
      dispatchAppState(isLoadingMain(false));
    }
  };
};
