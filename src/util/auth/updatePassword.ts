import firebase from 'firebase/app';
import 'firebase/auth';

type Props = {
  password: string;
  user: firebase.User;
};

export const updatePasswordInFirebase = ({ password, user }: Props) => {
  user
    .updatePassword(password)
    .then(function () {
      return;
    })
    .catch(function (err) {
      throw new Error('updatePasswordに失敗' + err);
    });
};
