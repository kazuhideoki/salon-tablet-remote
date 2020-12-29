import React from "react";
import {
  Store,
} from "../../../Store/Store";
import { T_articles_get, apiArticlesGet, T_articles_get_return } from "../../../../pages/api/articles/get";
import { ArticlesContext } from "../../../Store/articles/Context";
import { set } from "../../../Store/articles/actions";
import { TApiResponse } from "../../../../lib/apiTypes";
import { UserInfoContext } from "../../../Store/userInfo/Context";

export const useGetArticles = () => {
  const {
    dispatchAppState,
  } = React.useContext(Store);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchArticles } = React.useContext(ArticlesContext);
  
  return async (isSetting: boolean, page: number, selectingTags?: number[], showArticles = true) => {
    
    dispatchAppState({ type: "CLOSE_MODAL" });
    dispatchAppState({ type: "ON_IS_LOADING_MAIN" });
    
    const params: T_articles_get = {
      page,
      selectingTags: selectingTags || [],
      isSetting: isSetting,
      userId: userInfo.user_id,
    };

    const data = await apiArticlesGet(params)

    if (data.err === true) {
      alert("記事を取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_MAIN" });
      return false
    } else {
      const arg = {
          data,
          selectedArticlesTags: selectingTags || [],
          isSetting,
          showArticles: showArticles,
        }
      
      dispatchAppState({
        type: "SET_ARTICLES",
        payload: arg,
      });
      dispatchArticles(set(arg.data));

      return true
    }
  };
};
