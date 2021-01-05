import React from 'react';
import { closeModal } from '../Store/appState/actions';
import { AppStateContext } from '../Store/appState/Context';
import { UserInfoContext } from '../Store/userInfo/Context';
import {
  // apiSubmitFeedback,
  T_submit_feedback,
} from '../../pages/api/submit_feedback';
import { apiWrapPost, TApiResponse } from '../../util/db/apiWrap';

type Type = {
  contactFormTitle: string;
  setContactFormTitle: React.Dispatch<React.SetStateAction<string>>;
  contactFormContent: string;
  setContactFormContent: React.Dispatch<React.SetStateAction<string>>;
};

// nodemailerをフロントエンドでインポートするとエラー「module not found can't resolve 'dns' nodemailer」になるので、フロント側で実装
const apiSubmitFeedback = async (
  params: T_submit_feedback
): Promise<TApiResponse<void>> => {
  return apiWrapPost('submit_feedback', params);
};

export const useSubmitFeedback = ({
  contactFormTitle,
  setContactFormTitle,
  contactFormContent,
  setContactFormContent,
}: Type) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);

  return async () => {
    const params: T_submit_feedback = {
      contactFormTitle,
      contactFormContent,
      userInfo,
    };

    try {
      await apiSubmitFeedback(params);

      alert('送信されました。');
      setContactFormTitle('');
      setContactFormContent('');
      dispatchAppState(closeModal());
    } catch (err) {
      console.log(`useSubmitFeedback ${JSON.stringify(err)}`);
      alert('送信に失敗しました。');
    }
  };
};
