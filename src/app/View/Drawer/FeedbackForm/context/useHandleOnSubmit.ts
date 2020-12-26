import React from "react";
import { useSubmitFeedback } from "../../../../ActionCreator/useSubmitFeedback";
import { Store } from "../../../../Store/Store";

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
  const { dispatchAppState } = React.useContext(Store);

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
      dispatchAppState({ type: "CLOSE_MODAL" });
    } else {
      alert("送信に失敗しました。");
    }
  };
};
