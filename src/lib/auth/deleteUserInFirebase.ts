import firebase from 'firebase/app';
import 'firebase/auth';

export const deleteUserInFirebase = async (password: string): Promise<void> => {
  try {
    const user = firebase.auth().currentUser;

    if (user?.email) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );

      user
        ?.reauthenticateWithCredential(credential)
        .then(async function () {
          await user
            .delete()
            .then(function () {
              return;
            })
            .catch(function (err) {
              console.log('deleteUserInFirebaseでエラー' + err);
            });
        })
        .catch(function (err) {
          throw `reauthenticateWithCredential ${err}`;
        });
    } else {
      console.log(`firebase.auth.AuthCredentialはnull`);
    }
  } catch (err) {
    throw `deleteUserInFirebase: ${err}`;
  }
};
