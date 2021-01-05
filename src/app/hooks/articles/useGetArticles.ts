import React from 'react';
import {
  T_articles_get,
  apiArticlesGet,
} from '../../../pages/api/articles/get';
import { ArticlesContext } from '../../store/articles/Context';
import { set } from '../../store/articles/actions';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import {
  closeModal,
  isLoadingMain,
  isShowInstagram,
  setArticlesAppState,
} from '../../store/appState/actions';

export const useGetArticles = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchArticles } = React.useContext(ArticlesContext);

  return async (
    isSetting: boolean,
    page: number,
    selectingTags?: number[],
    showArticles = true
  ) => {
    dispatchAppState(closeModal());
    dispatchAppState(isLoadingMain(true));

    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: userInfo.user_id,
    };

    try {
      const data = await apiArticlesGet(params);
      const arg = {
        data: data.rawData,
        selectedArticlesTags: selectingTags || [],
        isSetting,
        showArticles: showArticles,
      };

      dispatchAppState(setArticlesAppState(arg));
      const bool = showArticles === true ? false : appState.isShowInstagram;
      dispatchAppState(isShowInstagram(bool));
      dispatchArticles(set(arg.data));
      dispatchAppState(isLoadingMain(false));

      return true;
    } catch (err) {
      alert('記事を取得できませんでした');
      dispatchAppState(isLoadingMain(false));
      return false;
    }
  };
};
