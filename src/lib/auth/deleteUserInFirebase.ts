import firebase from 'firebase/app';
import 'firebase/auth';

export const deleteUserInFirebase = async (): Promise<void> => {
  const user = firebase.auth().currentUser;
  if (user)
    await user
      .delete()
      .then(function () {
        return;
      })
      .catch(function (err) {
        console.log('deleteUserInFirebaseでエラー' + err);
      });
};
