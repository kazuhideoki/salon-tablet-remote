import React from 'react';

import { useGetInfoBar } from './useGetInfoBar';
import {
  ApiInfoBarUpdate,
  apiInfoBarUpdate,
} from '../../../pages/api/info_bar/update';
import { InfoBarType } from '../../../util/interface/Interface';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import { closeModal } from '../../store/appState/actions';

export const scrollingAnimationDuration = (charCount: number) =>
  (32 * charCount) / 245 + 8; // アニメーションの再生時間がが文字数に応じて増え、どの文字数でもある程度同じスピードで再生されるように調整

type Props = {
  infoBarType: InfoBarType;
  editorText: string;
  articleInfoBar: number;
  charCount: number;
};

export const useUpdateInfoBar = (params: Props) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const getInfoBar = useGetInfoBar();

  return async () => {
    dispatchAppState(closeModal());

    const updateInfoBarParams: ApiInfoBarUpdate = {
      user_id: userInfo.user_id,
      info_bar_type: params.infoBarType,
      scrolling_sentence: params.editorText,
      scrolling_animation_duration: scrollingAnimationDuration(
        params.charCount
      ),
      selected_article_id: params.articleInfoBar,
    };

    try {
      await apiInfoBarUpdate(updateInfoBarParams);
      dispatchAppState(closeModal());

      getInfoBar();
    } catch (err) {
      console.log(`useUpdateInfoBar: ${err}`);

      alert('更新できませんでした');
    }
  };
};
