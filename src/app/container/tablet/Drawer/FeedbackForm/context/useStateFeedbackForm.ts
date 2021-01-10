import React from 'react';

export const useStateFeedbackForm = () => {
  const [contactFormTitle, setContactFormTitle] = React.useState('');
  const [contactFormContent, setContactFormContent] = React.useState('');

  return {
    contactFormTitle,
    setContactFormTitle,
    contactFormContent,
    setContactFormContent,
  };
};
