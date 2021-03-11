import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ContactMail } from '@material-ui/icons';
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
