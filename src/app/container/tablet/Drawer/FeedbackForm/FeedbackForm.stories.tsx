import React from 'react';
import { FeedbackFormPresenter } from './FeedbackForm';
import { FeedbackFormPresenterProps } from './useFeedbackForm';
export default {
  title: 'Drawer/FeedbackForm',
  component: FeedbackFormPresenter,
};

const props: FeedbackFormPresenterProps = {
  contactFormTitle: '',
  setContactFormTitle: () => {
    return;
  },
  contactFormContent: '',
  setContactFormContent: () => {
    return;
  },
  submitFeedback: async () => {
    return;
  },
};

export const Normal = () => <FeedbackFormPresenter {...props} />;
