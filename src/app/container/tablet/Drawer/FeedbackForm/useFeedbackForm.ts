import { useSubmitFeedback } from '../../../../hooks/useSubmitFeedback';
import { useStateFeedbackForm } from './context/useStateFeedbackForm';

export const useFeedbackFormProps = () => {
  const {
    contactFormTitle,
    setContactFormTitle,
    contactFormContent,
    setContactFormContent,
  } = useStateFeedbackForm();

  const submitFeedback = useSubmitFeedback({
    contactFormTitle,
    setContactFormTitle,
    contactFormContent,
    setContactFormContent,
  });

  return {
    contactFormTitle,
    setContactFormTitle,
    contactFormContent,
    setContactFormContent,
    submitFeedback,
  };
};

export type FeedbackFormPresenterProps = ReturnType<
  typeof useFeedbackFormProps
>;
