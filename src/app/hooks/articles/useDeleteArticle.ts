import React from 'react';
import { T_article_id } from '../../store/Interface';
import { useGetArticles } from './useGetArticles';
import { apiArticlesDelete } from '../../../pages/api/articles/delete';
import { ArticlesContext } from '../../store/articles/Context';
import { AppStateContext } from '../../store/appState/Context';
import { isLoadingMain } from '../../store/appState/actions';

export const useDeleteArticle = () => {
  const getArticles = useGetArticles();
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { paginationParams } = React.useContext(ArticlesContext);
  const { articles } = React.useContext(ArticlesContext);

  return async (article_id: T_article_id): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }

    dispatchAppState(isLoadingMain(true));
    try {
      await apiArticlesDelete({ article_id });

      if (articles.length === 1 && paginationParams.rowCount > 1) {
        const targetPage = paginationParams.page - 1;
        getArticles(appState.isSetting, targetPage);
      } else {
        getArticles(appState.isSetting, paginationParams.page);
      }
    } catch (err) {
      alert('削除できませんでした');
      dispatchAppState(isLoadingMain(false));
    }
  };
};
