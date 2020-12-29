import React from "react";
import { useSubmitFeedback } from "../../../../../ActionCreator/useSubmitFeedback";
import { useModalProps } from "../../../Modal/Modal/view/Modal";

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
  const { closeModal } = useModalProps();

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
      closeModal()
    } else {
      alert("送信に失敗しました。");
    }
  };
};
