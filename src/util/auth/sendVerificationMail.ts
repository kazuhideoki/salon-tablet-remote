import firebase from 'firebase/app';
import 'firebase/auth';

export const sendVerificationMail = async (
  user: firebase.User
): Promise<boolean> => {
  return user
    .sendEmailVerification()
    .then(function () {
      return true;
    })
    .catch(function () {
      return false;
    });
};
