import React from 'react';
import {
  ApiArticlesGet,
  apiArticlesGet,
} from '../../../pages/api/articles/get';
import { ArticlesContext } from '../../stores/articles/Context';
import { set } from '../../stores/articles/actions';
import { UserInfoContext } from '../../stores/userInfo/Context';
import { AppStateContext } from '../../stores/appState/Context';
import {
  closeModal,
  isLoadingMain,
  isShowInstagram,
  setArticlesAppState,
} from '../../stores/appState/actions';

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

    const params: ApiArticlesGet = {
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
