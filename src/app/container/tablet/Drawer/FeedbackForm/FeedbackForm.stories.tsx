import React from 'react';
import {
  FeedbackFormPresenter,
  FeedbackFormPresenterProps,
} from './FeedbackForm';
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
