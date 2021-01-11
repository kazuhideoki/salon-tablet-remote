import React from 'react';
import { closeModal } from '../stores/appState/actions';
import { AppStateContext } from '../stores/appState/Context';
import { UserInfoContext } from '../stores/userInfo/Context';
import { ApiSubmitFeedback } from '../../pages/api/submit_feedback';
import { apiWrapPost, ApiResponse } from '../../util/db/apiWrap';

type Props = {
  contactFormTitle: string;
  setContactFormTitle: React.Dispatch<React.SetStateAction<string>>;
  contactFormContent: string;
  setContactFormContent: React.Dispatch<React.SetStateAction<string>>;
};

// nodemailerをフロントエンドでインポートするとエラー「module not found can't resolve 'dns' nodemailer」になるので、フロント側で実装
const apiSubmitFeedback = async (
  params: ApiSubmitFeedback
): Promise<ApiResponse<void>> => {
  return apiWrapPost('submit_feedback', params);
};

export const useSubmitFeedback = (props: Props): (() => Promise<void>) => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);

  return async () => {
    const params: ApiSubmitFeedback = {
      contactFormTitle: props.contactFormTitle,
      contactFormContent: props.contactFormContent,
      userInfo,
    };

    try {
      await apiSubmitFeedback(params);

      alert('送信されました。');
      props.setContactFormTitle('');
      props.setContactFormContent('');
      dispatchAppState(closeModal());
    } catch (err) {
      console.log(`useSubmitFeedback ${JSON.stringify(err)}`);
      alert('送信に失敗しました。');
    }
  };
};
