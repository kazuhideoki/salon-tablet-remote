import React from "react";
import { useSubmitFeedback } from "../../../../ActionCreator/useSubmitFeedback";
import { closeModal } from "../../../../../Store/appState/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";

type Type = {
  contactFormTitle: string;
  setContactFormTitle: React.Dispatch<React.SetStateAction<string>>;
  contactFormContent: string;
  setContactFormContent: React.Dispatch<React.SetStateAction<string>>;
};

export const useHandleOnSubmit = ({
  contactFormTitle,
  setContactFormTitle,
  contactFormContent,
  setContactFormContent,
}: Type) => {
  const { dispatchAppState} = React.useContext(AppStateContext)

  const submitFeedback = useSubmitFeedback();

  return async () => {
    const result = await submitFeedback({
      contactFormTitle,
      contactFormContent,
    });

    if (result.sent === true) {
      alert("送信されました。");
      setContactFormTitle("");
      setContactFormContent("");
      dispatchAppState(closeModal())
    } else {
      alert("送信に失敗しました。");
    }
  };
};
