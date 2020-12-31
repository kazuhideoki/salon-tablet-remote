import React from "react";
import { T_articles_get, apiArticlesGet, T_articles_get_return } from "../../../../pages/api/articles/get";
import { ArticlesContext } from "../../../Store/articles/Context";
import { set } from "../../../Store/articles/actions";
import { UserInfoContext } from "../../../Store/userInfo/Context";
import { AppStateContext } from "../../../Store/appState/Context";
import { useModalProps } from "../../../View/tablet/Modal/Modal/view/Modal";
import { useMainProps } from "../../../View/tablet/Main/view/Main";
import { closeModal, isLoadingMain, isShowInstagram, setArticlesAppState } from "../../../Store/appState/actions";

export const useGetArticles = () => {
  const {
    dispatchAppState,
  } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchArticles } = React.useContext(ArticlesContext);
  
  return async (isSetting: boolean, page: number, selectingTags?: number[], showArticles = true) => {
    
    dispatchAppState(closeModal())
    dispatchAppState(isLoadingMain(true))
    
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: userInfo.user_id,
    };

    const data = await apiArticlesGet(params)
    

    if (data.err === true) {
      alert("記事を取得できませんでした");
      dispatchAppState(isLoadingMain(false));
      return false
    } else {
      const arg = {
          data,
          selectedArticlesTags: selectingTags || [],
          isSetting,
          showArticles: showArticles,
        }
      
      dispatchAppState(setArticlesAppState(arg));
      dispatchArticles(set(arg.data));
      dispatchAppState(isLoadingMain(false));

      return true
    }
  };
};
